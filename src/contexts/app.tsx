// External
import React, { createContext, useState, useContext } from "react";

import Snackbar from "@material-ui/core/Snackbar";

// Custom Components
import CustomDialog from "../components/CustomDialog";
import CustomAlert from "../components/CustomAlert";

// @ts-ignore
const context = createContext<Context>({});

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export function AppContext({ children }: Props) {
  // Message dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);

  // Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);
  const [toastMessage, setToastMessage] = useState("false");

  // Global value
  const [registrationCallback, setRegistrationCallback] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({
    email: "",
    full_name: "",
    id: 0,
    role: "",
    status: "",
  });

  const showErrorDialog = (show: boolean, message: string) => {
    setDialogSuccess(false);
    setDialogMessage(message);
    setDialogOpen(show);
  };

  const showSuccessDialog = (show: boolean, message: string) => {
    setDialogSuccess(true);
    setDialogOpen(show);
    setDialogMessage(message);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const setRegistrationCallbackData = (userInfo: any, destroy = false) => {
    if (destroy) {
      setRegistrationCallback(false);
      setUserInfo({ email: "", full_name: "", id: 0, registerType: "", role: "", status: "" });
    } else {
      setRegistrationCallback(true);
      setUserInfo(userInfo);
    }
  };

  const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  const showToast = (show: boolean, type?: ToastType, message?: string) => {
    if (type) {
      setToastType(type);
    }
    if (message) {
      setToastMessage(message);
    }
    setToastOpen(show);
  };

  return (
    <context.Provider
      value={{
        open: dialogOpen,
        message: dialogMessage,
        showErrorDialog,
        showSuccessDialog,
        setRegistrationCallbackData,
        showToast,
        registrationCallback,
        userInfo,
      }}
    >
      {children}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <CustomAlert onClose={handleToastClose} severity={toastType}>
          {toastMessage}
        </CustomAlert>
      </Snackbar>

      <CustomDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        errorMessage={dialogMessage}
        success={dialogSuccess}
      />
    </context.Provider>
  );
}

export function useApp() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

interface Context {
  open: boolean;
  message: string;
  registrationCallback: boolean;
  userInfo: any;
  showErrorDialog: (show: boolean, message: string) => void;
  showSuccessDialog: (show: boolean, message: string) => void;
  setRegistrationCallbackData: (userInfo: any, destroy?: boolean) => void;
  showToast: (show: boolean, type?: ToastType, message?: string) => void;
}

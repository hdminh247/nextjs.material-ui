// External import
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

// Material UI Components
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import color from "../palette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "400px",
      [theme.breakpoints.down("sm")]: {
        minWidth: "inherit",
      },
    },
    title: {
      "& h2": {
        color: color.standardGreen,
      },
    },
    warningTitle: {
      "& h2": {
        color: color.red,
      },
    },
  }),
);

export default function CustomDialog({ open, errorMessage, onClose, success = false }: Props) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.root }}
    >
      <DialogTitle className={clsx(classes.title, { [classes.warningTitle]: !success })} id="alert-dialog-title">
        {success ? "Success" : "Warning"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface Props {
  open: boolean;
  success?: boolean;
  errorMessage: string;
  onClose: () => void;
}

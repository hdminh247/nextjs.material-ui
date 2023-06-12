import { createStyles, makeStyles } from "@material-ui/core/styles";

import colors from "src/palette";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "95vh",
      padding: 0,
    },
    fullHeightContainer: {
      height: "100%",
    },
    relativeContainer: {
      position: "relative",
    },
    formWrapper: {
      position: "relative",
      height: "100%",
    },
    formInput: {
      margin: "10px 0",
    },
    joinArtistButton: {
      position: "absolute",
      bottom: "70px",
      backgroundColor: colors.secondaryColor,
      border: "1px solid",
      borderColor: colors.secondaryColor,
      left: "50%",
      transform: "translateX(-50%)",
    },
    rightContainer: {
      padding: "50px 65px",
      backgroundColor: colors.lightGrey,
    },
    title: {
      marginBottom: "35px",
      fontWeight: "bold",
      textAlign: "center",
    },
    subTitle: {
      fontWeight: "bold",
      margin: "15px 0",
    },
    facebookLoginIcon: {
      width: "45px",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.normalGrey,
      borderRadius: "5px",
      cursor: "pointer",
    },
    greyText: {
      color: colors.grey,
    },
    dividerContainer: {
      marginTop: "10px",
    },
    signUpButton: {
      marginTop: "15px",
    },
    alreadyMemberWrapper: {
      marginTop: "15px",
      cursor: "pointer",
    },
    boldText: {
      fontWeight: 500,
    },
    forgotPasswordText: {
      fontWeight: 500,
      color: colors.secondaryColor,
      marginLeft: "5px",
      "& a": {
        textDecoration: "none",
      },
    },
    registerText: {
      fontWeight: 500,
      marginLeft: "5px",
      "& a": {
        textDecoration: "none",
        color: colors.secondaryColor,
      },
    },
    image: {
      width: "70%",
      height: "auto",
      cursor: "pointer",
    },
    closeButton: {
      float: "right",
      color: colors.grey[600],
      top: 0,
      right: 0,
    },
    passFreeConfirmWrapper: {
      margin: "35px 0",
    },
  }),
);

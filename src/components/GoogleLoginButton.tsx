import Image from "next/image";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SocialLogin from "react-social-login";

import PrimaryButton from "./PrimaryButton";

const useStyles = makeStyles({
  googleSignUpButton: {
    "& .MuiButton-startIcon": {
      position: "absolute",
      left: "20px",
    },
  },
});

const GoogleLoginButton = (props: {
  triggerLogin: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
  children: any;
}) => {
  const classes = useStyles();

  // This make sure React does not complain about invalid prop
  const domProps = { ...props };
  delete domProps.triggerLogin;

  return (
    <>
      <PrimaryButton
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Image src="/images/icons/google.png" alt="fb" width={17} height={17} />}
        fullWidth
        className={classes.googleSignUpButton}
        onClick={props.triggerLogin}
        {...domProps}
      >
        {props.children}
      </PrimaryButton>
    </>
  );
};

export default SocialLogin(GoogleLoginButton);

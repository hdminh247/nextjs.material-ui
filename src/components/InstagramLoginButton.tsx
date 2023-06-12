import Image from "next/image";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SocialLogin from "react-social-login";

import colors from "../palette";

const useStyles = makeStyles({
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
});

const InstagramLoginButton = (props: {
  triggerLogin: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}) => {
  const classes = useStyles();

  // This make sure React does not complain about invalid prop
  const domProps = { ...props };
  delete domProps.triggerLogin;

  return (
    <div className={classes.facebookLoginIcon} onClick={props.triggerLogin} {...domProps}>
      <Image src="/images/icons/instagram.png" alt="fb" width={25} height={25} />
    </div>
  );
};

export default SocialLogin(InstagramLoginButton);

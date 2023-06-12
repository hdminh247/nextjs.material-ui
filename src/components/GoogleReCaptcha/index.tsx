import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomDivider from "src/components/CustomDivider";
import colors from "src/palette";

import getConfig from "next/config";

import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  TReCaptchaV2Callback,
} from "react-recaptcha-x";

const useStyles = makeStyles({
  greyText: {
    color: colors.grey,
  },
  dividerContainer: {
    marginTop: "10px",
  },
  checkWrapperSuccess: {
    marginTop: "10px",
    color: colors.standardGreen,
  },
  checkWrapperError: {
    marginTop: "10px",
    color: colors.brightRed,
  },
});

export default function GoogleReCaptcha({ setIsHuman }: { setIsHuman: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();
  const recaptchaSiteKey = getConfig().publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [msg, setMsg] = useState({ status: false, message: "" });

  const v2Callback: TReCaptchaV2Callback = (token: string | false | Error): void => {
    if (typeof token === "string") {
      setMsg({ status: true, message: "Security check succeeded." });
      setIsHuman(true);
    } else if (typeof token === "boolean" && !token) {
      setMsg({ status: false, message: "Please tick the checkbox again" });
    } else if (token instanceof Error) {
      setMsg({ status: false, message: "Error. Something went wrong. Please try again" });
    }
  };

  return (
    <Grid container item justifyContent={"center"}>
      {!msg.status ? (
        <ReCaptchaProvider siteKeyV2={recaptchaSiteKey} langCode="en">
          <CustomDivider className={classes.dividerContainer}>
            <Typography className={classes.greyText}>Security Check</Typography>
          </CustomDivider>

          <ReCaptchaV2
            callback={v2Callback}
            theme={EReCaptchaV2Theme.Light}
            size={EReCaptchaV2Size.Normal}
            id="googleReCaptcha"
            data-test-id="googleReCaptcha-test-id"
          />

          <Typography variant="caption" align="center" className={classes.checkWrapperError}>
            {msg.message}
          </Typography>
        </ReCaptchaProvider>
      ) : (
        <Typography variant="caption" align="center" className={classes.checkWrapperSuccess}>
          {msg.message}
        </Typography>
      )}
    </Grid>
  );
}

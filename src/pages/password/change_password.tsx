// External import
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useYupValidationResolver } from "../../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

// Custom Component
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";

import colors from "../../palette";

// API
import { resetPassword } from "../../api";

// Context
import { useApp } from "../../contexts";

import { PasswordValidationRegex } from "../../constants/auth";

const useStyles = makeStyles({
  container: {
    height: "100vh",
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
  rightContainer: {
    padding: "50px 65px",
    backgroundColor: colors.lightGrey,
  },
  title: {
    fontWeight: "bold",
    marginLeft: "10px",
  },
  resetPasswordButton: {
    marginTop: "15px",
  },
  image: {
    width: "70%",
    height: "auto",
  },
  iconButton: {
    marginLeft: "-12px", // Adjust margin instead of padding to prevent affecting to hover circle shape
  },
  backButton: {
    color: colors.black,
  },
});

export default function ResetPassword() {
  const app = useApp();
  const router = useRouter();

  const { token } = router.query;

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        password: yup
          .string()
          .required("Password is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
        confirmPassword: yup
          .string()
          .required("Confirm password field is required")
          .matches(
            PasswordValidationRegex,
            "Confirm password has to contain 6-10 characters, at least 1 letter and 1  number",
          )
          .oneOf([yup.ref("password")], "This field have to be same as Password field"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });

  const onSubmit = async ({ password, confirmPassword }: passwordResetParams) => {
    const { error, errors } = await resetPassword({
      token,
      password,
      confirmPassword,
    });

    // No error happens
    if (!error) {
      app.showSuccessDialog(true, "Password changed successfully. Login to proceed");

      location.replace("/login");
    } else {
      app.showErrorDialog(true, errors ? errors.toString() : "We are not able to change your password. Try again.");
    }
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justifyContent={"center"}>
          <img src={"/images/left-background-landing-page.png"} alt={"background"} className={classes.image} />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Grid container alignItems={"center"}>
            <Link href={"/login"}>
              <IconButton aria-label="back" className={classes.iconButton}>
                <ArrowBackIcon className={classes.backButton} />
              </IconButton>
            </Link>

            <Typography variant={"h5"} display={"inline"} className={classes.title}>
              Change your password
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <FormInput
              name="password"
              className={classes.formInput}
              label={"Password"}
              id="password"
              placeholder={"Password"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              type={"password"}
              errors={errors.password}
            />

            <FormInput
              name="confirmPassword"
              className={classes.formInput}
              label={"Confirm Password"}
              id="confirmPassword"
              placeholder={"Confirm Password"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              type={"password"}
              errors={errors.confirmPassword}
            />
            <PrimaryButton
              className={classes.resetPasswordButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              primaryColor
            >
              Change Password
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

interface passwordResetParams {
  password: string;
  confirmPassword: string;
}

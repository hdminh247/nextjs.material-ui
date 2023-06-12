// External import
import React, { useEffect, useMemo, createRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../utils";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Google recaptcha component
import GoogleReCaptcha from "src/components/GoogleReCaptcha";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Custom Component
import PrimaryButton from "../../components/PrimaryButton";
import CustomDivider from "../../components/CustomDivider";
import FormInput from "../../components/FormInput";
import GoogleLoginButton from "../../components/GoogleLoginButton";
// import InstagramLoginButton from "../../components/InstagramLoginButton";

const useStyles = makeStyles(() =>
  createStyles({
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
    joinArtistButton: {
      position: "absolute",
      bottom: "70px",
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
    signInText: {
      fontWeight: 500,
      color: colors.lightYellow,
      marginLeft: "5px",
    },
    image: {
      width: "70%",
      height: "auto",
      cursor: "pointer",
    },
    googleSignUpButton: {
      "& .MuiButton-startIcon": {
        position: "absolute",
        left: "20px",
      },
    },
  }),
);

// Contexts
import { useAuth, AuthState } from "../../contexts";
import { PasswordValidationRegex, googleAppId } from "../../constants/auth";

// APIs
import { getInstagramProfile } from "../../api";

import colors from "../../palette";

export default function Register() {
  const socialLoginRef = createRef();

  const router = useRouter();
  const { register, socialRegister, status } = useAuth();

  // Validation schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name field is required"),
        email: yup.string().required("Email address field is required").email("* Wrong email format"),
        password: yup
          .string()
          .required("Password field is required")
          .matches(PasswordValidationRegex, "Password has to contain 6-10 characters, at least 1 letter and 1  number"),
      }),
    [],
  );

  const classes = useStyles();
  const resolver = useYupValidationResolver(validationSchema);
  const { control, handleSubmit, errors } = useForm({ resolver });
  const [ref, setRef] = useState();
  const [isHuman, setIsHuman] = useState(false);

  // On submit form
  const onSubmit = async (data: Register.FormData) => {
    const { email, password, firstName, lastName } = data;
    await register({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });
  };

  // Social login sucessfully
  const onSocialRegisterSuccess = async (
    email: string,
    socialId: number,
    firstName: string,
    lastName: string,
    provider: string,
  ) => {
    const { error } = await socialRegister({
      email,
      socialId,
      name: `${firstName} ${lastName}`,
      provider,
    });

    // Error happens, logout users from social
    if (error) {
      if (ref) {
        // Dirt hack to resolve react social keep remember logged in state
        // window.location.reload();
      }
    }
  };

  // User grant access to login by google
  const handleGoogleLogin = async (user: any) => {
    const {
      _profile: { email, id, firstName, lastName },
    } = user;

    onSocialRegisterSuccess(email, id, firstName, lastName, "google");
  };

  // Google login fail
  const handleGoogleLoginFailure = (e: any | undefined) => {
    // Dirt hack to resolve react social keep remember logged in state
    // window.location.reload();
    console.error(`Google login fail`, e);
  };

  const setSocialLoginRef = () => socialLoginRef;

  useEffect(() => {
    if (router.query && router.query.code) {
      // Callback from instagram login
      getInstagramProfile({
        code: router.query.code,
        redirectUrl: `${process.env.NEXT_PUBLIC_INSTAGRAM_REGISTER_REDIRECT_URL}`,
      }).then((data) => {
        // Any error happens, go back to register page
        if (data.error) {
          router.replace("/register");
        } else {
          const {
            data: { id, username },
          } = data;
          onSocialRegisterSuccess(username, id, username, "", "instagram");
        }
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (socialLoginRef.current) {
      // @ts-ignore
      setRef(socialLoginRef.current);
    }
  }, [socialLoginRef.current]);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid container item lg={8} md={8} sm={true} xs={true} alignItems={"center"} justifyContent={"center"}>
          <Link href={"/home"}>
            <img src={"/images/left-background-landing-page.png"} alt={"background"} className={classes.image} />
          </Link>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          <Typography variant={"h5"} className={classes.title}>
            Join to Connect with Certified Tattoo Artists & Studios near you
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
            <Typography className={classes.subTitle} display={"block"}>
              Sign up with:
            </Typography>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} xs={12}>
                {status !== AuthState.pending && (
                  <GoogleLoginButton
                    ref={socialLoginRef}
                    provider="google"
                    appId={googleAppId}
                    onLoginSuccess={handleGoogleLogin}
                    onLoginFailure={handleGoogleLoginFailure}
                    getInstance={setSocialLoginRef}
                  >
                    Sign up with Google
                  </GoogleLoginButton>
                )}
              </Grid>
              {/*<Grid container item lg={2} md={2} xs={2} justifyContent={"center"}>*/}
              {/*  <InstagramLoginButton*/}
              {/*    provider="instagram"*/}
              {/*    appId={instagramAppId}*/}
              {/*    scope={"user_profile"}*/}
              {/*    redirect={`${process.env.NEXT_PUBLIC_INSTAGRAM_REGISTER_REDIRECT_URL}`}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>

            <CustomDivider className={classes.dividerContainer}>
              <Typography className={classes.greyText}>Or</Typography>
            </CustomDivider>

            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={6}>
                <FormInput
                  name="firstName"
                  label={"First Name"}
                  id="firstName"
                  placeholder={"First Name"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={""}
                  errors={errors.firstName}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={6}>
                <FormInput
                  name="lastName"
                  label={"Last Name"}
                  id="lastName"
                  placeholder={"Last Name"}
                  fullWidth
                  control={control}
                  variant={"outlined"}
                  defaultValue={""}
                  errors={errors.lastName}
                />
              </Grid>
            </Grid>

            <FormInput
              name="email"
              classes={{ root: classes.formInput }}
              label={"Email Address"}
              id="email"
              placeholder={"Email address"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.email}
            />

            <FormInput
              name="password"
              label={"Password"}
              id="password"
              placeholder={"Password"}
              fullWidth
              control={control}
              variant={"outlined"}
              defaultValue={""}
              errors={errors.password}
              type={"password"}
            />

            <GoogleReCaptcha setIsHuman={setIsHuman} />

            <PrimaryButton
              className={classes.signUpButton}
              type={"submit"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              primaryColor
              disabled={isHuman ? false : true}
            >
              Sign up
            </PrimaryButton>

            <Grid container item justifyContent={"center"} className={classes.alreadyMemberWrapper}>
              <Typography className={classes.boldText}>Already a member?</Typography>
              <Link href={"/login"}>
                <Typography className={classes.signInText}> Sign in</Typography>
              </Link>
            </Grid>

            <PrimaryButton
              variant="outlined"
              color="primary"
              size="large"
              className={classes.joinArtistButton}
              primaryColor
              fullWidth
              href={"/register-selection"}
            >
              Join as a tattoo artist or studio
            </PrimaryButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

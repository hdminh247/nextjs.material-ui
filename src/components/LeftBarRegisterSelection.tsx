// External
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import Link from "next/link";

// Material UI Components
import color from "../palette";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Custom Components
import StepCircle from "./StepCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      padding: "45px",
      position: "relative",
    },
    desktopDisplay: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    mobileDisplay: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    titleText: {
      fontWeight: 500,
      marginLeft: "15px",
    },
    stepItemSelected: {
      opacity: 0.5,
    },
    imageWrapper: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
    },
    imageItem: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      maxWidth: "300px",
    },
    checkIcon: {
      color: color.standardGreen,
    },
    logo: {
      maxWidth: "244px",
      width: "100%",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
    logoWrapper: {
      position: "absolute",
      top: "48px",
      left: "45px",
      width: "auto",
      paddingRight: "45px",
      cursor: "pointer",
    },
    stepMobileIconList: {
      position: "absolute",
      bottom: 0,
      left: "22px",
      height: "12px",
      zIndex: 1,
    },
  }),
);

export default function LeftBarRegisterSelection({ step, role }: { step: number; role: string }) {
  const classes = useStyles();

  const StepItem = ({
    name,
    selected = false,
    checked = false,
  }: {
    name: string;
    selected?: boolean;
    checked?: boolean;
  }) => {
    return (
      <>
        {!checked && <RadioButtonUncheckedIcon className={clsx({ [classes.stepItemSelected]: !selected })} />}
        {checked && <CheckCircleIcon className={classes.checkIcon} />}
        <Typography
          className={clsx(classes.titleText, { [classes.stepItemSelected]: !selected && !checked })}
          display={"inline"}
        >
          {name}
        </Typography>
      </>
    );
  };

  return (
    <>
      <Grid
        container
        className={clsx(classes.root, classes.desktopDisplay)}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Link href={"/dashboard"}>
          <div className={classes.logoWrapper}>
            <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
          </div>
        </Link>

        <Grid container spacing={4}>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Select Account"} selected={step === 0} checked={step > 0} />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Account Details"} selected={step === 1} checked={step > 1} />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem
              name={role === "artist" ? "Artist Information" : "Studio Information"}
              selected={step === 2}
              checked={step > 2}
            />
          </Grid>
          {/*<Grid container item lg={12} md={12} sm={12} alignItems={"center"}>*/}
          {/*  <StepItem name={"Working Location"} selected={step === 3} checked={step > 3} />*/}
          {/*</Grid>*/}
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem
              name={role === "artist" ? "Your Style of Work" : "Business Settings"}
              selected={step === 3}
              checked={step > 3}
            />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem
              name={role === "artist" ? "Upload Avatar" : "Upload Logo"}
              selected={step === 4}
              checked={step > 4}
            />
          </Grid>
          <Grid container item lg={12} md={12} sm={12} alignItems={"center"}>
            <StepItem name={"Work showcase"} selected={step === 5} checked={step > 5} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={clsx(classes.mobileDisplay)} alignItems={"center"} justifyContent={"center"}>
        <Link href={"/dashboard"}>
          <Grid container alignItems={"center"} justifyContent={"center"}>
            <img src={"/images/icons/logo.svg"} className={classes.logo} alt={"logo"} />
          </Grid>
        </Link>

        <div className={classes.stepMobileIconList}>
          <StepCircle active={step > 0} selected={step === 0} />
          <StepCircle active={step > 1} selected={step === 1} />
          <StepCircle active={step > 2} selected={step === 2} />
          <StepCircle active={step > 3} selected={step === 3} />
          <StepCircle active={step > 4} selected={step === 4} />
          <StepCircle active={step > 5} selected={step === 5} />
        </div>
      </Grid>
    </>
  );
}

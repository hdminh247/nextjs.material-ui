// External
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import color from "../palette";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: color.brightRed,
    fontSize: "0.8rem",
  },
});

export default function ErrorMessage(props: any) {
  const classes = useStyles();
  return <Typography className={classes.root}>{props.children}</Typography>;
}

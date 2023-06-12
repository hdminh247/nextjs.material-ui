import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Grid from "@material-ui/core/Grid";

import colors from "../palette";

const useStyles = makeStyles({
  root: {
    margin: "inherit",
  },
  loadingIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: colors.standardYellow,
    animation: "sk-rotateplane 1.2s infinite ease-in-out",
  },
  positionFixed: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

export default function Loading({ className, fixed = false }: Props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"center"}
      className={clsx(classes.root, className, { [classes.positionFixed]: fixed })}
    >
      <div className={classes.loadingIcon} />
    </Grid>
  );
}

interface Props {
  className?: string;
  fixed?: boolean;
}

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import colors from "src/palette";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colors.white,
    },
    closeButton: {
      float: "right",
      color: colors.grey[800],
      backgroundColor: colors.normalGrey,
      top: 0,
      right: 0,
    },
    cardWrapper: {
      border: "none",
      boxShadow: "none",
    },
    titleText: {
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    sectionSubTitle: {
      color: colors.standardGrey,
      marginBottom: "15px",
    },
    itemWrapper: {
      marginTop: "10px",
    },
    logo: {
      objectFit: "contain",
      width: "150px",
      height: "25px",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "180px",
      },
    },
  }),
);

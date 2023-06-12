// External import
import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchOverlay from "./SearchOverlay";

// Context
import { useAuth } from "../contexts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 200px",
      [theme.breakpoints.down("sm")]: {
        padding: "10px",
      },
    },
    seeMoreButton: {
      width: "191px",
    },
  }),
);

export default function BodyContent({ children, variant, className }: Props | Props2) {
  const classes = useStyles();
  const auth = useAuth();

  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  return (
    <>
      <Container maxWidth={false} className={classes.root}>
        <Header
          userProfile={auth.user}
          openSearch={() => {
            setShowSearchOverlay(true);
          }}
        />
        {variant !== "div" && <Grid container>{children}</Grid>}
        {variant === "div" && <div className={className}>{children}</div>}
      </Container>
      <Footer />
      {showSearchOverlay && (
        <SearchOverlay
          onClose={() => {
            setShowSearchOverlay(false);
          }}
        />
      )}
    </>
  );
}

interface Props {
  children: JSX.Element[];
  variant?: string;
  className?: any;
}

interface Props2 {
  children: JSX.Element;
  variant?: string;
  className?: any;
}

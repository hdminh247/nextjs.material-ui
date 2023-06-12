import Image from "next/image";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { defaultStudioBanner } from "../constants";
import React from "react";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
    },
  });

const useStyles = makeStyles(styles);

export default function FullWidthCover({ src, name }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Image src={src.image_url || defaultStudioBanner} width={1920} height={444} alt={name} layout={"responsive"} />
    </div>
  );
}

interface Props {
  src: any;
  name?: string;
}

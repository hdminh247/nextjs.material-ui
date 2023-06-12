import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import colors from "./palette";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5469D4",
    },
    secondary: {
      main: colors.bluePastel,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    allVariants: {
      color: colors.standardBlack,
    },
    fontFamily: ["Cabin", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  },
});

export default theme;

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

export default function CustomAlert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

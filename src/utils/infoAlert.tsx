import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

const InfoAlert = ({
  infoAlert,
  setInfoAlert,
}: {
  infoAlert: { severity: string; message: string };
  setInfoAlert: React.Dispatch<
    React.SetStateAction<{
      severity: string;
      message: string;
    }>
  >;
}) => (
  <Grid container justifyContent="center">
    <Grid item xs={10}>
      <Alert
        severity={
          infoAlert.severity === "error"
            ? "error"
            : infoAlert.severity === "success"
            ? "success"
            : infoAlert.severity === "info"
            ? "info"
            : "warning"
        }
        onClose={() => setInfoAlert({ severity: "info", message: "" })}
      >{`${infoAlert.message}`}</Alert>
    </Grid>
  </Grid>
);

export default InfoAlert;

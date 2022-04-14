/* Importing the Snackbar, MuiAlert, and CryptoState from the material-ui and CryptoContext. */
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../CryptoContext";

const Alert = () => {
  /* Destructuring the alert and setAlert from the CryptoState. */
  const { alert, setAlert } = CryptoState();

  /**
   * If the user clicks away from the alert, then do nothing. Otherwise, close the alert.
   * @param event - The event source of the callback
   * @param reason - "clickaway"
   * @returns the state of the alert.
   */
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  /* Returning the state of the alert. */
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

/* Importing the necessary components from the material-ui library. */
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import Signup from "./SignUp";
import Login from "./Login";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../FireBase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/* Styling the modal. */
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  /* Setting the state of the modal. */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  /* A hook that is used to set the state of the modal. */
  const classes = useStyles();

  /* Destructuring the setAlert function from the CryptoState context. */
  const { setAlert } = CryptoState();

  /**
   * The handleOpen function sets the state of the open variable to true.
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * The handleClose function sets the open state to false.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * The handleChange function takes in an event and a newValue, and then sets the value to the
   * newValue.
   * @param event - The event source of the callback
   * @param newValue - The new value of the slider.
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* Creating a new instance of the GoogleAuthProvider class. */
  const googleProvider = new GoogleAuthProvider();

  /**
   * SignInWithGoogle() is a function that calls signInWithPopup() which is a function that takes two
   * arguments, auth and googleProvider, and returns a promise that resolves to an object with a user
   * property that has an email property.
   */

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  /* Returning a div with a button and a modal. */
  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#83db7b",
          color: "#ffffff",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

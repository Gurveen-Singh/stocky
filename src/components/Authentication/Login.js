/* Importing the Box, Button, TextField, useState, CryptoState, auth, and signInWithEmailAndPassword
from the material-ui/core, react, CryptoContext, FireBase, and firebase/auth. */
import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  /* Setting the email and password to an empty string. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Destructuring the setAlert from the CryptoState. */
  const { setAlert } = CryptoState();

  /**
   * It takes the email and password from the form and sends it to the firebase authentication service.
   * If the authentication is successful, it sets the alert to a success message and closes the modal. If
   * the authentication fails, it sets the alert to an error message.
   * @returns The result of the signInWithEmailAndPassword function.
   */
  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  /* Returning the Box, TextField, and Button components. */
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#4D9A9A", color: "white" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;

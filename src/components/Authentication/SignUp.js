/* Importing the Box, Button, TextField, useState, CryptoState, createUserWithEmailAndPassword, and
auth from the material-ui/core, react, CryptoContext, firebase/auth, and FireBase. */
import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";

const Signup = ({ handleClose }) => {
  /* Setting the state of the email, password, and confirmPassword. */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  /**
   * If the password and confirmPassword are not equal, set the alert to open, with a message of
   * "Passwords do not match" and a type of "error".
   *
   * If the password and confirmPassword are equal, then create a user with the email and password. If
   * the user is created successfully, set the alert to open, with a message of "Sign Up Successful.
   * Welcome ${result.user.email}" and a type of "success".
   *
   * If the user is not created successfully, set the alert to open, with a message of error.message and
   * a type of "error".
   * @returns The result of the createUserWithEmailAndPassword function.
   */
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#4D9A9A", color: "#ffffff" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;

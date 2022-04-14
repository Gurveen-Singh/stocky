import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";

/* Rendering the App component to the root element in the index.html file. */
ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById("root")
);

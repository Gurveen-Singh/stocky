import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContext";

ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById("root")
);

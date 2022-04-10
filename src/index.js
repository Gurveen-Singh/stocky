import * as ReactDOMClient from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import "react-alice-carousel/lib/alice-carousel.css";

import CryptoContext from "./CryptoContext";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <CryptoContext>
    <App />
  </CryptoContext>
);

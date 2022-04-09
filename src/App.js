import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import Home from "./container/Home";
import CoinPage from "./container/CoinPage";

import "./App.css";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div>
        <Header className={classes.App} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

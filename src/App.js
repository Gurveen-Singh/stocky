/* Importing the necessary components for the app to run. */
import { makeStyles } from "@material-ui/core";
import Home from "./container/Home";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./container/CoinPage";
import Header from "./components/Header";
import Alert from "./components/Alert";

/* Setting the background color, color, and minHeight of the app. */
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#4D9A9A",
    minHeight: "100vh",
  },
}));

function App() {
  /* A hook that is used to set the styles of the app. */
  const classes = useStyles();

  /* Returning the app. */
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;

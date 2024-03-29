/* Importing all the required components from the material-ui library. */
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSideBar";
import "../App.css";

/* A style object. */
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "#4D9A9A",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "2rem",
  },
}));

/* Creating a dark theme for the app. */
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    type: "dark",
  },
});

function Header() {
  /* A hook that is used to access the styles object. */
  const classes = useStyles();

  /* Destructuring the state object. */
  const { currency, setCurrency, user } = CryptoState();

  /* A hook that is used to access the history object. */
  const history = useHistory();

  /* Returning the JSX code. */
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Stocky
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 85, height: 40 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            <div className="header__profile">
              {user ? <UserSidebar /> : <AuthModal />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;

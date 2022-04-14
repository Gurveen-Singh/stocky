/* Importing the Container, makeStyles, Typography from the material-ui/core library. It is also
importing the Carousel component from the Carousel.js file. */
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

/* Defining the styles for the banner. */
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  /* A hook that is used to access the styles defined in the useStyles function. */
  const classes = useStyles();

  /* Returning the JSX code that is used to render the banner. */
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              color: "#4D9A9A",
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Stocky
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;

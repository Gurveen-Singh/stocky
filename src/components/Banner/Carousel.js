/* Importing the modules. */
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/Api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  /* Setting the state of the trending array to an empty array. */
  const [trending, setTrending] = useState([]);

  /* Destructuring the currency and symbol from the CryptoState. */
  const { currency, symbol } = CryptoState();

  /**
   * When the component mounts, fetch the trending coins from the API and set the state of the trending
   * coins to the data returned from the API.
   */
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  /* A hook that is used to fetch the data from the API. */
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  /* Styling the carousel. */
  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "#ffffff",
    },
  }));

  /* A hook that is used to style the carousel. */
  const classes = useStyles();

  /* Mapping the trending array and returning the coin object. */
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    /* Returning the coin object. */
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  /* Setting the number of items to be displayed on the carousel. */
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  /* Returning the carousel. */
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={600}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;

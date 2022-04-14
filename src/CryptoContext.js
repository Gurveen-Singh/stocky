/* Importing the required modules. */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./FireBase";
import axios from "axios";
import { CoinList } from "./config/Api";
import { onSnapshot, doc } from "firebase/firestore";

/* Creating a context. */
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  /* Creating a state for the component. */
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  /* A useEffect hook that is listening to the user state. If the user state changes, it will run the
code inside the hook. */
  useEffect(() => {
    if (user) {
      /* Listening to the watchlist collection in the firestore database. */
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  /* Listening to the user state. If the user is authenticated, it will set the user state to corresponding user else null  */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  /**
   * When the component mounts, fetch the coin list from the API and set the state of the coins and
   * loading to the data and false respectively.
   */
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  /* This is a useEffect hook that is listening to the currency state. If the currency state changes, it
will run the code inside the hook. */
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  /* Returning the value of the context. */
  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        coins,
        loading,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

/* Exporting the CryptoContext component. */
export default CryptoContext;

/**
 * It returns the value of the CryptoContext.Provider.
 * @returns The CryptoContext.Provider value.
 */
export const CryptoState = () => {
  return useContext(Crypto);
};

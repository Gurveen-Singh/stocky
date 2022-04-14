/* Importing the necessary libraries and components. */
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/Api";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/Data";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
  /* Registering the chart.js library. */
  ChartJS.register(...registerables);

  /* Setting the state of the component. */
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  /* A hook that is used to get the currency from the context. */
  const { currency } = CryptoState();

  /* A style for the container. */
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  /* A hook that is used to get the styles from the useStyles function. */
  const classes = useStyles();

  /**
   * FetchHistoricData is an async function that uses axios to get data from the HistoricalChart
   * function, and then sets the data.prices to the state of historicData.
   */
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

  /* A hook that is used to fetch the data from the API. */
  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  /* Creating a dark theme for the component. */
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      type: "dark",
    },
  });

  /* Returning the JSX code for the component. */
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "#ADD8E6" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "rgb(5.1%, 59.6%, 72.9%)",
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1.6,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;

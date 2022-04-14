/**
 * This function takes a currency as an argument and returns a URL that will return a list of coins in
 * JSON format.
 * @param currency - The currency you want to get the prices in.
 */
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

/**
 * This function takes an id as an argument and returns a string that is a URL to a coin's data on the
 * CoinGecko API.
 * @param id - The id of the coin you want to get.
 */
export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

/**
 * This function takes in an id, days, and currency and returns a string that is a url to a chart of
 * the coin's historical data.
 * @param id - The id of the coin you want to get the historical data for.
 * @param [days=365] - The number of days to show in the chart.
 * @param currency - The currency you want to get the prices in.
 */
export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

/**
 * This function takes a currency as an argument and returns a URL that will return a list of the top
 * 10 trending coins in that currency.
 * @param currency - The currency you want to get the prices in.
 */
export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

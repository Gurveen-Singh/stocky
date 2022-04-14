/* Importing the React library, the Banner component, and the CoinsTable component. */
import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

/**
 * It returns a fragment that contains the Banner and CoinsTable components.
 * @returns A React component.
 */
const Home = () => {
  return (
    <>
      <Banner />
      <CoinsTable />
    </>
  );
};

export default Home;

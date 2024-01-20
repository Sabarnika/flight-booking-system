import React from "react";
import Navbar from "../components/Navbar";
import BestOffer from "../components/BestOffer";
import PopularRoute from "../components/PopularRoute";
import BestRoute from "../components/BestRoute";
import HomeSearch from "../components/HomeSearch";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Navbar />
      <HomeSearch />
      <BestOffer />
      <PopularRoute />
      <BestRoute />
    </div>
  );
}

export default HomeScreen;

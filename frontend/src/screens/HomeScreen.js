import React from "react";
import Navbar from "../components/Navbar";
import BestOffer from "../components/BestOffer";
import PopularRoute from "../components/PopularRoute";
import BestRoute from "../components/BestRoute";

function HomeScreen() {
  return (
    <div className="homescreen">
      <Navbar />
      <BestOffer />
      <PopularRoute />
      <BestRoute />
    </div>
  );
}

export default HomeScreen;

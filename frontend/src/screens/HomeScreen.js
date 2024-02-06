import React from "react";
import Navbar from "../components/Navbar";
import PopularRoute from "../components/PopularRoute";
import BestRoute from "../components/BestRoute";
import Reviews from "../components/Reviews"
function HomeScreen() {
  return (
    <div className="homescreen">
      <Navbar />
     <PopularRoute />
      <BestRoute />
      <Reviews/>
    </div>
  );
}

export default HomeScreen;

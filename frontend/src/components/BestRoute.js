import React from "react";
import {useNavigate} from "react-router-dom";
import '../styles/HomeScreen.css'
function BestRoute() {
  const navigate = useNavigate();
  const handleBook=()=>
  {
    navigate("/bookings");
  }
  return (
    <div className="travel-best-route">
      <h2>Book Cheap Flights and FlyHigh</h2>
      <div>
        <span>Flying from</span>
        <h3>National Flights</h3>
        <div className="travel-route">
          <h5 className="best-route">Goa</h5>
          <h5 className="best-route">Kerala</h5>
          <h5 className="best-route">Chennai</h5>
          <h5 className="best-route">Mumbai</h5>
          <h5 className="best-route">Jaipur</h5>
          <h5 className="best-route">Delhi</h5>
          <h5 className="best-route">Pune</h5>
        </div>
        <button onClick={handleBook} className="book">Book Now</button>
        <h3>International Flights</h3>
        <div className="travel-route">
          <h5 className="best-route">America</h5>
          <h5 className="best-route">China</h5>
          <h5 className="best-route">Malaysia</h5>
          <h5 className="best-route">Sweded</h5>
          <h5 className="best-route">Singapore</h5>
          <h5 className="best-route">Sweden</h5>
          <h5 className="best-route">Thailand</h5>
        </div>
        <button onClick={handleBook} className="book">Book Now</button>
      </div>
      <hr />
    </div>
  );
}

export default BestRoute;

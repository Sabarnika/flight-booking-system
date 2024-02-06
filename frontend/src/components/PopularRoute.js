import React from "react";
import '../styles/HomeScreen.css'
export default function PopularRoute() {
  return (
    <div className="best-route-container">
      <h2>Popular Flight Routes</h2>
      <div className="popular-flight-routes-container">
        <div className="popular-flight-routes">
          <div className="popular-flight-route-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s"
              alt="image" className="imgg"
            />
          </div>
          <div className="popular-flight-route-detail">
            <h3>Pune Flights</h3>
            <h4>
              <span>from</span> Goa,Delhi,Bangalore
            </h4>
          </div>
        </div>
        <div className="popular-flight-routes">
          <div className="popular-flight-route-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s"
              alt="image" className="imgg"
            />
          </div>
          <div className="popular-flight-route-detail">
            <h3>Delhi Flights</h3>
            <h4>
              <span>from</span> Banglore,Mumbai,Chennai
            </h4>
          </div>
        </div>
        <div className="popular-flight-routes">
          <div className="popular-flight-route-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s"
              alt="image" className="imgg"
            />
          </div>
          <div className="popular-flight-route-detail">
            <h3>Mumbai Flights</h3>
            <h4>
              <span>from</span> Goa,Delhi,Bangalore
            </h4>
          </div>
        </div>    
        <div className="popular-flight-routes">
          <div className="popular-flight-route-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s"
              alt="image" className="imgg"
            />
          </div>
          <div className="popular-flight-route-detail">
            <h3>Chennai Flights</h3>
            <h4>
              <span>from</span> Bangalore,Mumbai,Nagpur
            </h4>
          </div>
        </div>
        <div className="popular-flight-routes">
          <div className="popular-flight-route-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s"
              alt="image" className="imgg"
            />
          </div>
          <div className="popular-flight-route-detail">
            <h3>Indore Flights</h3>
            <h4>
              <span>from</span> Banglore,Nagpur
            </h4>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

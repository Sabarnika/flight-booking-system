import React from "react";
import "../styles/HomeScreen.css";
function BestOffer() {
  return (
    <div>
      <h2 className="best">Best Offers Available upto 60%</h2>
      <div className="container mt-4">
        <div className="row">
          <div className="col-4 best-flight-offer-container">
            <img
              src="https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0="
              className="gal-img bst"
            />
            <hr />
            <div className="info">
              <h2>From Delhi to Jaipur</h2>
              <h5>
                $30 <s>$40</s>
              </h5>
            </div>
          </div>
          <div className="col-4 best-flight-offer-container">
            <img
              src="https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0="
              className="gal-img bst"
            />
            <hr />
            <div className="info">
              <h2>From Mumbai to Pune</h2>
              <h5>
                $18 <s>$40</s>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BestOffer;

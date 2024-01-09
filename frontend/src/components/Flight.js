import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../util";
import { toast } from "react-toastify";
import Axios from "axios";
import Loading from "./Loading";
import { Store } from "../store";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false };
    default:
      return state;
  }
};
function Flight() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails, airports } = state;
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const fetchAirports = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.get("http://localhost:5000/airport/fetch");
      localStorage.setItem("airports", JSON.stringify(data));
      ctxDispatch({ type: "ADD_AIRPORT", payload: data });
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchAirports();
  }, []);
  const handleBook = () => {
    navigate("/bookings");
  };
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
              {airports &&
                airports.map((airport) => (
                  <h2 key={airport.id} value={airport.code}>
                    {airport.name} ({airport.code})-{airport.location}
                  </h2>
                ))}
              <h5>
                $30 <s>$40</s>
              </h5>
              <button onClick={handleBook}>Book now</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Flight;

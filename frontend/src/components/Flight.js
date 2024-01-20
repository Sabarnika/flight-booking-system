import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../util";
import { toast } from "react-toastify";
import Axios from "axios";
import Loading from "./Loading";
import { Store } from "../store";
import '../styles/Flights.css'
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
  const [source,setSource]=useState('')
  const [dest,setDes]=useState('')
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
      <h2 className="heading">Best Offers Available upto 60%</h2>
      <div>
        <div>
          <div>
            <hr />
        <div className="container">
       {airports &&
         airports.map((airport, index) => (
         <div className="information" key={airport.id}>
        <img
          src="https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw="
          className="gal-img bst"
        />
        <h2 className="info">
          <span>From : </span> {airport.name} ({airport.code})-{airport.location}
        </h2>
        {index < airports.length  && (
          <h2 className="info">
            <span>To : </span>
            {airports[airports.length -index- 1].name} ({airports[airports.length - 1].code})-{airports[airports.length - 1].location}
          </h2>
        )}
        <button onClick={handleBook}>Book now</button>
       </div>
       ))}
       </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Flight;

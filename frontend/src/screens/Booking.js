import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../util";
import { toast } from "react-toastify";
import Axios from "axios";
import { Store } from "../store";
import '../styles/Flights.css';

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

function Booking() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails, airports } = state;
  const [source, setSource] = useState('');
  const [depatureAirport, setDepatureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [searchDate, setSearchDate] = useState("");
 
  const [dest, setDes] = useState('');
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
    if (source && dest) {
      navigate(`/bookings/${source}/${dest}`);
    } else {
      toast.error("Please select both source and destination airports.");
    }
  };
  return (
    <div>
      <h2 className="heading">Book your tickets and fly high</h2>
      <div>
        <div>
          <div>
            <hr />
            <div className="container">
            <div>
<label htmlFor="depAirport">Depature Airport</label>
<select
  id="depAirport"
  value={depatureAirport}
  onChange={(e) => setDepatureAirport(e.target.value)}
  required
>
  <option></option>
  {airports &&
    airports.map((airport) => (
      <option key={airport.id} value={airport.code}>
        {airport.name} ({airport.code})-{airport.location}
      </option>
    ))}
</select>
</div>
<div className="input-feilds">
<label htmlFor="arrAirport">Arrival Airport</label>
<select
  id="arrAirport"
  value={arrivalAirport}
  onChange={(e) => setArrivalAirport(e.target.value)}
  required
>
  <option></option>
  {airports.map((airport) => (
    <option key={airport.id} value={airport.code}>
      {airport.name} ({airport.code})-{airport.location}
    </option>
  ))}
</select>
</div>
<div className="input-fields">
<label htmlFor="time">Depature Time</label>
<input
  type="date"
  id="time"
  value={searchDate}
  onChange={(e) => setSearchDate(e.target.value)}
  required
/>
</div>
<button type="submit">SEARCH</button>
           </div>
          </div>
        </div>
      <hr />
      </div>
    </div>
  );
}
export default Booking;

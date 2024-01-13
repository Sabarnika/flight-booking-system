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

function HomeSearch() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails, airports } = state;
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (departureAirport && arrivalAirport && searchDate) {
      fetchSchedules();
    }
  }, [departureAirport, arrivalAirport, searchDate]);

  const fetchSchedules = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.post("http://localhost:5000/search/fetch", {
        departureAirport,
        arrivalAirport,
        searchDate,
      });
      setSchedules(data);
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
  };

  const handleBookNow = () => {
    navigate("/bookings");
  };

  return (
    <div>
      <Loading />
      <form>
        <div className="input-fields">
          <label htmlFor="depAirport">Departure Airport</label>
          <select
            id="depAirport"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
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
          <label htmlFor="time">Departure Time</label>
          <input
            type="date"
            id="time"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            required
          />
        </div>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {schedules.length > 0 ? (
          <div>
            <h2>Schedules Available:</h2>
            {schedules.map((schedule) => (
              <div key={schedule.id}>
                <p>Flight from {schedule.departureAirport} to {schedule.arrivalAirport} on {schedule.date}</p>
                <button onClick={handleBookNow}>Book Now</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No schedules found.</p>
        )}
      </div>
    </div>
  );
}
export default HomeSearch;

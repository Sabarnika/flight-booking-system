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
  const [depatureAirport, setDepatureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [searchDate, setSearchDate] = useState("");
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
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.post("http://localhost:5000/search/fetch", {
        depatureAirport,
        arrivalAirport,
        searchDate,
      });
      ctxDispatch({
        type: "SEARCH",
        payload: { isSearch: true, searchSchedules: data },
      });
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
    navigate("/bookings");
  };
  return (
    <div>
      <Loading />
      <form onSubmit={handleSearch}>
        <div className="input-fields">
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
      </form>
    </div>
  );
}

export default HomeSearch;

import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useContext, useState, useReducer, useEffect } from "react";
import { Store } from "../store";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../util";
const ACTIONS = {
  FETCH_FAILED: "FETCH_FAILED",
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_FAILED:
      return { ...state, loading: false };
    case ACTIONS.FETCH_REQUEST:
      return { ...state, loading: false };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default function HomeSearch() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails, airports } = state;
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [depAirport, setDepAirport] = useState("");
  const [arrAirport, setArrAirport] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const fetchAirports = async () => {
    try {
      dispatch({ type: ACTIONS.FETCH_REQUEST });
      const { data } = await Axios.get("/api/airport/fetch");
      localStorage.setItem("airports", JSON.stringify(data));
      ctxDispatch({ type: "ADD_AIRPORT", payload: data });
      dispatch({ type: ACTIONS.FETCH_SUCCESS });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILED });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchAirports();
  }, []);

  const searchHanlder = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: ACTIONS.FETCH_REQUEST });
      const { data } = await Axios.post("/api/search", {
        depAirport,
        arrAirport,
        searchDate,
      });
      ctxDispatch({
        type: "SEARCH",
        payload: { isSeach: true, searchSchedule: data },
      });
      dispatch({ type: ACTIONS.FETCH_SUCCESS });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILED });
      toast.error(getError(err));
    }
    navigate("/bookings");
  };
  return (
    <div>
      {loading && Loading}
      <form onSubmit={searchHanlder}>
        <label htmlFor="depAirport">Depature Airport</label>
        <select
          id="depAirport"
          value={depAirport}
          onChange={(e) => setDepAirport(e.target.value)}
          required
        >
          <option></option>
          {airports &&
            airports.map((airport) => (
              <option key={airport._id} value={airport.code}>
                {airport.name}({airport.locationCode}) -- {airport.location}
              </option>
            ))}
        </select>
        <i className="fa-solid fa-right-left"> </i>
        <div>
          <label htmlFor="arrAirport"> Arrival Airport </label>{" "}
          <select
            id="arrAirport"
            value={arrAirport}
            onChange={(e) => setArrAirport(e.target.value)}
            required
          >
            <option> </option>
            {airports &&
              airports.map((airport) => (
                <option key={airport._id} value={airport.code}>
                  {airport.name}({airport.code}) - {airport.location}{" "}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="departureAirport"> Departure Time </label>{" "}
          <input
            type="date"
            id="departureTimet"
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

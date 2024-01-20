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
  const [depatureAirport, setDepatureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [numSeats, setNumSeats] = useState(0); 
  const [seatType, setSeatType] = useState("Economic"); 
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

  const handleBook = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/admin/add-schedule", {
        flightId:"02",
        departureAirport: depatureAirport,
        arrivalAirport: arrivalAirport,
        seats: [
          {
            class: seatType,
            countSeats: numSeats,
            fare: seatType==="Economic" ? 2000 : 5000,
          },
        ],
        date: searchDate,
      });

      toast.success("Flight booked successfully!");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <h2 className="heading">Book your tickets and fly high</h2>
      <div>
            <hr />
            <div className="container">
              <div className="input-fields col-sm-6">
                <label htmlFor="depAirport">Departure Airport</label>
                <select
                  id="depAirport"
                  value={depatureAirport}
                  onChange={(e) => setDepatureAirport(e.target.value)}
                  required
                  className="form-select form-select-sm" aria-label=".form-select-sm example"
                >
                  <option></option>
                  {airports &&
                    airports.map((airport) => (
                      <option key={airport.id || airport.code} value={airport.code}>
                        {airport.name} ({airport.code})-{airport.location}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-fields col-sm-6">
                <label htmlFor="arrAirport">Arrival Airport</label>
                <select
                  id="arrAirport"
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                  required
                  className="form-select form-select-sm" aria-label=".form-select-sm example"
                >
                  <option></option>
                  {airports.map((airport) => (
                    <option key={airport.id || airport.code} value={airport.code}>
                      {airport.name} ({airport.code})-{airport.location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-fields col-sm-6">
                <label htmlFor="time">Departure Time</label>
                <input
                  type="date"
                  id="time"
                  className="form-control"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  required
                />
              </div>
              <div className="input-fields col-sm-6">
                <label>No of Seats</label>
                <input
                  type="number"
                  className="form-control"
                  value={numSeats}
                  onChange={(e) => setNumSeats(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="input-fields col-sm-6">
                <label>Seat type</label>
                <select
                className="form-select form-select-sm" aria-label=".form-select-sm example"
                  value={seatType}
                  onChange={(e) => setSeatType(e.target.value)}
                >
                  <option value="Economic">Economic</option>
                  <option value="Buisness">Buisness</option>
                </select>
              </div>
              </div>   
              <button type="submit" className="book" onClick={handleBook}>
                Book Now
              </button>
              <p className="total-cost">Total cost : {numSeats * (seatType === "Economic" ? 2000 : 5000)}</p> 
        <hr />
      </div>
    </div>
  );
}

export default Booking;

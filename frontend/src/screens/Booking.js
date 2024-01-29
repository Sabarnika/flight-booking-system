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
  const [flightId, setFlightId] = useState("");
  const [arrPort, setArrPort] = useState("");
  const [depPort, setDepPort] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [dates,setDates]=useState("");
  const [seatCount, setSeatCount] = useState(0);
  const [depatureAirport, setDepatureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [numSeats, setNumSeats] = useState(1); 
  const [seatType, setSeatType] = useState("Economic"); 
  const [date,setDate]=useState("")
  const [schedules, setSchedules] = useState([]); // Added state for schedules
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [selectedFlightId, setSelectedFlightId] = useState("");
 const handleAddSchedule = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5000/admin/add-schedule", {
        flightId,
        departureAirport: depPort,
        arrivalAirport: arrPort,
        departureTime: depTime,
        arrrivalTime: arrTime,
        countSeats: seatCount,
        date: dates,
      });
      localStorage.setItem("schedules",JSON.stringify(data))
      setSchedules(data);
      setFlightId("");
      setDepPort("");
      setArrPort("");
      setDepTime("");
      setArrTime("");
      setSeatCount("");
     toast.success("Schedule added successfully!");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const fetchSchedules = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5000/admin");
      setSchedules(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchSchedules(); 
  }, []);
  const handleBook = async () => {
    try {
     //  console.log(userDetails.user.name)
      const userId = userDetails ? userDetails.user._id : null;
    if (!userId) {
      console.error("User ID is not available in userDetails.");
      return;
    } 
   // console.log(userDetails.user._id)
   // console.log(userId)
      const {data} = await Axios.post(`http://localhost:5000/customer/add/${userId}`, {
        flightId: selectedFlightId,  
        depAirport: depatureAirport,
        arrAirport: arrivalAirport,
        seatClass: seatType,
        countSeats:numSeats,
        date: date,
      });
   //   console.log(data)
      localStorage.setItem("bookings", JSON.stringify(data));
      toast.success("Flight booked successfully!");
    } catch (err) {
      toast.error(getError(err));
    }
  }; 
  return (
    <div>
      <h2 className="heading">Book your tickets and fly high</h2>
      {
        userDetails.user.userType!="customer" &&
        (
          <div>
          <form>
          <div className="input-fields col-sm-6">
                  <label htmlFor="id">Flight Id</label>
                  <input
                    type="text"
                    id="id"
                    className="form-control"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                    required
                  />
           </div>
           <div className="input-fields col-sm-6">
                  <label htmlFor="arrPort">Arrival Airport</label>
                  <input
                    type="text"
                    id="arrPort"
                    className="form-control"
                    value={arrPort}
                    onChange={(e) => setArrPort(e.target.value)}
                    required
                  />
                </div>
                <div className="input-fields col-sm-6">
                  <label htmlFor="depPort">Departure Airport</label>
                  <input
                    type="text"
                    id="depPort"
                    className="form-control"
                    value={depPort}
                    onChange={(e) => setDepPort(e.target.value)}
                    required
                  />
                </div>
                <div className="input-fields col-sm-6">
                  <label htmlFor="depTime">Departure Time</label>
                  <input
                    type="text"
                    id="depTime"
                    className="form-control"
                    value={depTime}
                    onChange={(e) => setDepTime(e.target.value)}
                    required
                  />
                </div>
                <div className="input-fields col-sm-6">
                  <label htmlFor="arrTime">Arrival Time</label>
                  <input
                    type="text"
                    id="arrrTime"
                    className="form-control"
                    value={arrTime}
                    onChange={(e) => setArrTime(e.target.value)}
                    required
                  />
                </div>
                <div className="input-fields col-sm-6">
                  <label htmlFor="countSeat">Total Seats</label>
                  <input
                    type="number"
                    id="countSeat"
                    className="form-control"
                    value={seatCount}
                    onChange={(e) => setSeatCount(e.target.value)}
                    required
                  />
                </div>
                <div className="input-fields col-sm-6">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    required
                  />
                </div>
                <button onClick={handleAddSchedule}>Add Schedule</button>
          </form>
        </div>
        )
      }
         <div>
            <hr />
            <div className="container">
            <div className="input-fields col-sm-6">
          <label htmlFor="depAirport">Departure Airport</label>
          <select
            id="depAirport"
            value={depatureAirport}
            onChange={(e) => {
              setDepatureAirport(e.target.value);
              const selectedSchedule = schedules.find(schedule => schedule.departureAirport === e.target.value);
              setSelectedFlightId(selectedSchedule ? selectedSchedule.flightId : "");
            }}
            required
            className="form-select form-select-sm" aria-label=".form-select-sm example"
          >
            <option></option>
            {schedules.map((schedule) => (
              <option key={schedule.flightId} value={schedule.departureAirport}>
                ({schedule.departureAirport}) - {schedule.flightId}
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
            {schedules.map((schedule) => (
              <option key={schedule.flightId} value={schedule.arrivalAirport}>
                ({schedule.arrivalAirport}) - {schedule.flightId}
              </option>
            ))}
            </select>
           </div>
              <div className="input-fields col-sm-6">
                <label>No of Seats</label>
                <input
                  type="number"
                  className="form-control"
                  value={numSeats}
                  onChange={(e) => setNumSeats(e.target.value)}
                />
              </div>
              <div className="input-fields col-sm-6">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
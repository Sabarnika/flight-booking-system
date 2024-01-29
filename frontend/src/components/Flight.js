import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../util";
import { toast } from "react-toastify";
import Axios from "axios";
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
  const { userDetails, flights } = state;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [locCode, setLocCode] = useState("");
  const [time, setTime] = useState("");
 // const [flights, setFlights] = useState([]);
  const [source,setSource]=useState('')
  const [dest,setDes]=useState('')
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const fetchFlights = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await Axios.get("http://localhost:5000/airline/fetch");
      localStorage.setItem("flights", JSON.stringify(data));
      ctxDispatch({ type: "ADD_FLIGHTS", payload: data });
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_FAILED" });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchFlights();
  }, []);
  const handleBook = () => {
    navigate("/bookings");
  };
  const handleAddFlight = async () => {
    try {
      if (!id || !name || !loc || !locCode || !time) {
        toast.error("Please fill in all required fields.");
        return;
      }
    const { data } = await Axios.put("http://localhost:5000/airline/add", {
        flightId: id,
        name,
        location: loc,
        locationCode: locCode,
        time,
      });
      localStorage.setItem("flights",JSON.stringify(data))
     ctxDispatch({ type: "ADD_FLIGHTS", payload: data });
     setId("");
      setName("");
      setLoc("");
      setLocCode("");
      setTime("");
     toast.success("Flight added successfully!");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      {
        userDetails.user.userType!="customer" && (
          <div>
          <form>
          <div className="form-group col-sm-6">
            <label htmlFor="id">
             Flight Id<span>*</span>
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-control"
              id="id"
              placeholder="Enter here"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="name">
             Flight Name<span>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Enter here"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="loc">
            Location<span>*</span>
            </label>
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="form-control"
              id="loc"
              placeholder="Enter here"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="locCode">
            Location Code<span>*</span>
            </label>
            <input
              type="text"
              value={locCode}
              onChange={(e) => setLocCode(e.target.value)}
              className="form-control"
              id="locCode"
              placeholder="Enter here"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="tym">
           Time<span>*</span>
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-control"
              id="tym"
              placeholder="Enter like 11 am , 9 30 pm"
            />
          </div>
          <button onClick={handleAddFlight}>Add Flight</button>
          </form>
         </div>  
        )
      }
      <h2 className="heading">Best Offers Available upto 60%</h2>
        <div className="container">
       {flights &&
         flights.map((flight, index) => (
         <div key={flight.flightId} className="information" >
        <img
          src="https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw="
          className="gal-img bst"
        />
        <h2 className="info">
         {flight.name} ({flight.locationCode})-{flight.location} {flight.time} 
        </h2>
        <button onClick={handleBook}>Book now</button>
       </div>
       ))}
      </div>
      <hr />
    </div>
  );
}
export default Flight;

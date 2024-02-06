import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../store';
import Axios from 'axios';
import { getError } from "../util";
import { toast } from "react-toastify";
import '../styles/List.css'
import { useNavigate } from 'react-router-dom';
function List() {
  const { state } = useContext(Store);
  const { userDetails } = state;
  const navigate=useNavigate()
  const userId = userDetails ? userDetails.user._id : null;
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    const userId = userDetails ? userDetails.user._id : null;
   if(!userId) {
    console.error("User ID is not available in userDetails.");
    return;
   } 
    try {
      if(userDetails.user.userType=="customer")
      {
      const { data } = await Axios.get(`https://flight-booking-system-tau.vercel.app/customer/${userId}`);
     setBookings(data);
    } 
   else
   {
    const { data } = await Axios.get(`https://flight-booking-system-tau.vercel.app/customer`);
     setBookings(data);
   }
  }
  catch (err) {
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    fetchBookings(); 
  }, []);
  const deleteBooking = async (date) => {
    try {
      await Axios.put(`https://flight-booking-system-tau.vercel.app/customer/delete/${date}`);
       setBookings((prevBookings) => prevBookings.filter((booking) => booking.date !== date));
    } 
    catch (err) {
      toast.error(getError(err));
    }
  };  
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className='root'>
      <button onClick={handleGoBack} className="btn-back">
      Back
    </button>
      <h2 className='user'>User Bookings</h2>
      <ul className="bookings-container">
        {bookings.map((booking) => (
          <li key={booking.date} className="booking-item">
            <div>Flight ID: {booking.flightId}</div>
            <div>Departure Airport: {booking.depAirport}</div>
            <div>Arrival Airport: {booking.arrAirport}</div>
            <div>Seat Class: {booking.seatClass}</div>
            <div>Number of Seats: {booking.countSeats}</div>
            <div>Date: {booking.date}</div>
            <div>Fare: {booking.fare}</div>
            <button className='del' onClick={() => deleteBooking(booking.date)}>Delete</button>
           </li> 
        ))}
      </ul>
    </div>
  );
}
export default List;
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../store';
import Axios from 'axios';
import { getError } from "../util";
import { toast } from "react-toastify";
function List() {
  const { state } = useContext(Store);
  const { userDetails } = state;
  const userId = userDetails ? userDetails.user._id : null;
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
   // console.log(userDetails.user.name)
    const userId = userDetails ? userDetails.user._id : null;
   if(!userId) {
    console.error("User ID is not available in userDetails.");
    return;
   } 
    try {
      if(userDetails.user.userType=="customer")
      {
      const { data } = await Axios.get(`http://localhost:5000/customer/${userId}`);
     // console.log(data)
      setBookings(data);
    } 
   else
   {
    const { data } = await Axios.get(`http://localhost:5000/customer`);
    // console.log(data)
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
  return (
    <div>
      <h2>User Booking</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.date}>
            <div>Flight ID: {booking.flightId}</div>
            <div>Departure Airport: {booking.depAirport}</div>
            <div>Arrival Airport: {booking.arrAirport}</div>
            <div>Seat Class: {booking.seatClass}</div>
            <div>Number of Seats: {booking.countSeats}</div>
            <div>Date: {booking.date}</div>
            <div>Fare: {booking.fare}</div>
            <hr />
          </li>
        ))}
        <h1>d</h1>
      </ul>
    </div>
  );
}
export default List;
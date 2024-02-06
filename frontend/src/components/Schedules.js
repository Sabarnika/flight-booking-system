import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/List.css';
import { useNavigate } from 'react-router-dom'
const Schedules = () => {
  const navigate=useNavigate()
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await Axios.get('http://localhost:5000/admin/');
        setSchedules(data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    fetchSchedules();
  }, []);
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className='root'>
      <button onClick={handleGoBack} className="btn-back">
      Back
    </button>
      <h2 className='userr'>Schedules</h2>
      <ul className='booking-container'>
        {schedules.map(schedule => (
          <li key={schedule._id} className='booking-item'>
            <div>Flight ID: {schedule.flightId}</div>
            <div>Departure Airport: {schedule.departureAirport}</div>
            <div>Arrival Time: {schedule.arrivalTime}</div>
            <div>Departure Time: {schedule.departureTime}</div>
            <div>Arrival Airport: {schedule.arrivalAirport}</div>
            <div>Date: {schedule.date}</div>
            <div>
              {schedule.seats.map(seat => (
                <div key={seat._id}>
                  Count Seats: {seat.countSeats}
                </div>
              ))}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedules;

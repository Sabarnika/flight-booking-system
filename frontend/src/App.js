import React from "react";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activity from "./screens/Activity";
import Dashboard from "./screens/Dashboard";
import { useContext } from "react";
import { Store } from "./store";
import Flight from "./components/Flight";
import "./App.css";
import Booking from "./screens/Booking";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails } = state;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {!userDetails && <Route path="/user/sign-up" element={<Signup />} />}
        {!userDetails && <Route path="/user/sign-in" element={<Signin />} />}
        {userDetails && <Route path="/activities" element={<Activity />} />}
        {userDetails && <Route path="/flights" element={<Flight />} />}
        {userDetails && userDetails.user.userType === "admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {userDetails && <Route path="/bookings" element={<Booking />} />}
      </Routes>
    </Router>
  );
}
export default App;

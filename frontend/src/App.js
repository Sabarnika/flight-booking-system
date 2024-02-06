import React from "react";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useContext } from "react";
import { Store } from "./store";
import Flight from "./components/Flight";
import "./App.css";
import Booking from "./screens/Booking";
import List from "./screens/List";
import Schedules from "./components/Schedules";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails } = state;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {!userDetails && <Route path="/user/sign-up" element={<Signup />} />}
        {!userDetails && <Route path="/user/sign-in" element={<Signin />} />}
        {userDetails && <Route path="/bookings" element={<Booking />} />}
        {!userDetails && <Route path="/bookings" element={<Signin />} />}
        {!userDetails && <Route path="/flights" element={<Signin />} />}
        {userDetails && <Route path="/flights" element={<Flight />} />}
        {userDetails && <Route path="/activity" element={<List/>}/>}
        {userDetails && userDetails.user.userType=="customer" && <Route path="/check" element={<Schedules/>}/>}
        {!userDetails && <Route path="/activity" element={<Signin/>}/>}
        <Route path="/schedules" element={<Schedules/>}/>
     </Routes>
    </Router>
  );
}
 export default App;
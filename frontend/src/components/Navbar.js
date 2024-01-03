import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import { toast } from "react-toastify";

const ACTIONS = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
  SIGN_OUT: "sign_out",
};
export default function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const signoutHandler = () => {
    navigate("/");
    localStorage.removeItem("userDetails");
    ctxDispatch({ type: ACTIONS.SIGN_OUT });
    toast.success("Signed out successfully!");
  };

  return (
    <div>
      <h1>Flyhigh</h1>
      <div>
        <Link to="/">Home</Link>
        {state.userDetails &&
          state.userDetails.users?.userType !== "customer" && (
            <Link to="/dashboard">Dashboard</Link>
          )}
        <Link to="/bookings">Flights</Link>
        <Link to={state.userDetails ? "/activities" : "/api/user/sign-in"}>
          Activities
        </Link>
        <i className="fa-solid fa-magnifying-glass"></i>
        {state.userDetails ? (
          <div>
            <Link to="/api/user/profile">
              {state.userDetails.users?.firstname}
              <i className="fa-solid fa-user"> </i>
            </Link>
            <Link to="/" onClick={signoutHandler}>
              Log out
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/api/user/sign-in"> Log in </Link>
            <Link to="/api/user/sign-up"> Sign up </Link>
          </div>
        )}
      </div>
    </div>
  );
}

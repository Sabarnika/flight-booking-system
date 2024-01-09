import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import { toast } from "react-toastify";
function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails, search } = state;
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("userDetails");
    ctxDispatch({ type: "SIGN_OUT" });
    toast.success(userDetails.user.name + " signed out successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-lg navbar-light bg-light">
        <a href="#" className="navbar-brand">
          <img
            src="https://t3.ftcdn.net/jpg/01/21/05/58/240_F_121055831_PELQCbjwuiTc6DSaguE8u6OJUjJ1VC0l.jpg"
            style={{ height: "100px" }}
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              {userDetails && userDetails.user.userType !== "customer" && (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link
                to={userDetails ? "/activities" : "/user/sign-in"}
                className="nav-link"
              >
                Activity
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={userDetails ? "/flights" : "/user/sign-in"}
                className="nav-link"
              >
                Flights
              </Link>
            </li>
          </ul>
        </div>

        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav">
          {userDetails ? (
            <Link to="#" onClick={logoutHandler} className="nav-link">
              Log out
            </Link>
          ) : (
            <div>
              <li className="nav-item">
                <Link to="/user/sign-in" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/sign-up" className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

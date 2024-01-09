import React, { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../util";
import Axios from "axios";
import Loading from "../components/Loading";
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
function Signup() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [showpass, setShowpass] = useState("");
  const validatePassword = (pass) => {
    return pass.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.\s).{8,15}$/
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (pass == cpass) {
      if (validatePassword(pass)) {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await Axios.post(
            "http://localhost:5000/user/sign-up",
            {
              name,
              email,
              age,
              phone,
              place,
              password: pass,
            }
          );
          localStorage.setItem("userDetails", JSON.stringify(data));
          ctxDispatch({ type: "SIGN_UP", payload: data });
          toast.success(data.user.name + " signed up successfully");
          dispatch({ type: "FETCH_SUCCESS" });
          navigate("/");
        } catch (err) {
          dispatch({ type: "FETCH_FAILED" });
          toast.error(getError(err));
        }
      } else {
        toast.error(
          "Password should contain atleast 1 special character,1 digit ans 1 uppercase of 8-15 characters"
        );
      }
    } else {
      toast.error("Password Mismatch");
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">
            Name<span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter here"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email<span>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Enter here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">
            Age<span>*</span>
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="form-control"
            id="age"
            placeholder="Enter here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">
            Phone<span>*</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="Phone"
            placeholder="Enter here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Place">
            Place<span>*</span>
          </label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="form-control"
            id="Place"
            placeholder="Enter here"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pass">
            Password<span>*</span>
          </label>
          <input
            type={showpass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="form-control"
            id="pass"
            placeholder="Password should contain atleast 1 special character,1 digit ans 1 uppercase of 8-15 characters"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpass">
            Re-enter Password<span>*</span>
          </label>
          <input
            type={showpass ? "text" : "password"}
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            className="form-control"
            id="cpass"
            placeholder="Enter here"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={() => setShowpass(!showpass)}
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <h4>Already have an account?</h4>
      <Link to="/user/sign-in">Login</Link>
    </div>
  );
}
export default Signup;

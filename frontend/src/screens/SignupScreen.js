import { useContext, useReducer, useState } from "react";
import { Store } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../util";
import Loading from "../components/Loading";
import Axios from "axios";
const ACTIONS = {
  FETCH_FAILED: "FETCH_FAILED",
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_FAILED:
      return { ...state, loading: false };
    case ACTIONS.FETCH_REQUEST:
      return { ...state, loading: false };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default function SignupScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [password, setPass] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [cpass, setCpass] = useState("");
  const [email, setEmail] = useState("");
  const validatePassword = (text) => {
    return text.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === cpass) {
      if (validatePassword(password)) {
        try {
          dispatch({ type: ACTIONS.FETCH_REQUEST });
          const { data } = await Axios.put(
            "http://localhost:3500/api/user/sign-up",
            {
              email,
              password,
            }
          );

          localStorage.setItem("userDetails", JSON.stringify(data));
          ctxDispatch({ type: ACTIONS.SIGN_UP, payload: data });
          toast.success(data.users.email + " signed successfully");
          dispatch({ type: ACTIONS.FETCH_SUCCESS });
          navigate("/");
        } catch (err) {
          dispatch({ type: ACTIONS.FETCH_FAILED });
          toast.error(getError(err));
        }
      } else {
        toast.error(
          "Password should contain atleast 8-15 characters , 1 special character , 1 digit and 1 uppercase"
        );
      }
    } else {
      toast.error("Password Mismatch");
    }
  };

  return (
    <section>
      {loading && <Loading />}
      <div>
        <div>Sign Up</div>
        <form onSubmit={handleSignup}>
          <div className="input-fields">
            <label htmlFor="email">
              Email<span>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <label htmlFor="pass">
              Password<span>*</span>
            </label>
            <input
              type={passShow ? "text" : "password"}
              id="pass"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Altleast 8 characters including 1 digit,1 sepcial,1 uppercase"
              required
            />
          </div>
          <div className="input-fields">
            <label htmlFor="cpass">
              Confirm Password<span>*</span>
            </label>
            <input
              type={passShow ? "text" : "password"}
              id="cpass"
              value={cpass}
              onChange={(e) => setCpass(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <input
              type="checkbox"
              id="showPass"
              onChange={(e) => setPassShow(!passShow)}
            />
            <label htmlFor="showPass">Show Password</label>
          </div>
          <button type="submit">Signup</button>
          <h3>
            Already have an account <Link to="/api/user/sign-in">Login</Link>
          </h3>
        </form>
      </div>
    </section>
  );
}

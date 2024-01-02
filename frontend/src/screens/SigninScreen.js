import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useContext, useReducer, useState } from "react";
import { Store } from "../store";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../util";

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
export default function SigninScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: ACTIONS.FETCH_REQUEST });
      const { data } = await Axios.post(
        "http://localhost:3500/api/user/sign-in",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userDetails", JSON.stringify(data));
      ctxDispatch({ type: ACTIONS.SIGN_IN, payload: data });
      toast.success(data.users.email + " signed successfully");
      dispatch({ type: ACTIONS.FETCH_SUCCESS });
      navigate("/");
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILED });
      toast.error(getError(err));
    }
  };
  return (
    <section>
      {Loading && loading}
      <div>
        <div>Login</div>
        <form onSubmit={handleLogin}>
          <div className="input-fields">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <label htmlFor="pass">Password</label>
            <input
              type={showPass ? "text" : "password"}
              id="pass"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <div className="input-fields">
            <input
              type="checkbox"
              id="showPass"
              onChange={(e) => setShowPass(!showPass)}
            />
            <label htmlFor="showPass">Show Password</label>
          </div>
          <Link to="/forgot-pass">Forgot Password</Link>
          <button type="submit">Login</button>
          <h3>
            Not a member? <Link to="/api/user/sign-up">Create an account</Link>
          </h3>
        </form>
      </div>
    </section>
  );
}

import { createContext, useReducer,useEffect } from "react";
export const Store = createContext();
const initialState = {
  userDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null,
  bookings:localStorage.getItem("bookings")
  ? JSON.parse(localStorage.getItem("bookings"))
  : [],
  flights: localStorage.getItem("flights")
    ? JSON.parse(localStorage.getItem("flights"))
    : [],
  schedules: localStorage.getItem("schedules")
    ? JSON.parse(localStorage.getItem("schedules"))
    : []
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, userDetails: action.payload };
    case "SIGN_IN":
      return { ...state, userDetails: action.payload };
    case "SIGN_OUT":
      localStorage.removeItem("flights");
      localStorage.removeItem("schedules");
      localStorage.removeItem("bookings");

      return {
        ...state,
        userDetails: null,
        flights: [],
        schedules: [],
        bookings: [],
      };
    default:
      return state;
  }
};
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  useEffect(() => {
   const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      dispatch({ type: "SIGN_IN", payload: JSON.parse(storedUserDetails) });
    }
  }, []);
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}

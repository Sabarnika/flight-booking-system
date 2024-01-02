import { createContext, useReducer } from "react";

export const Store = createContext();
const ACTIONS = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
};
const initialState = {
  userDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return { ...state, userDetails: action.payload };
    case ACTIONS.SIGN_UP:
      return { ...state, userDetails: action.payload };
  }
};
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}

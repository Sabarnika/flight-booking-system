import { ToastContainer } from "react-toastify";
import SignupScreen from "./screens/SignupScreen";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userDetails } = state || {};

  return (
    <div>
      <ToastContainer limit={1} position="top-right" />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {!userDetails && (
          <Route path="/api/user/sign-up" element={<SignupScreen />} />
        )}
        {!userDetails && (
          <Route path="/api/user/sign-in" element={<SigninScreen />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

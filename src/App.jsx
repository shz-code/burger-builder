import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Components/Auth/Auth";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";
import Layout from "./Components/Layout";
import Checkout from "./Components/Orders/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import { userLoggedIn, userLoggedOut } from "./features/auth/authSlice";

function App() {
  const [authCheck, setAuthCheck] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { expiresIn, email, userId } = JSON.parse(auth);
      if (new Date(expiresIn) > new Date()) {
        dispatch(userLoggedIn({ email: email, localId: userId }));
      } else {
        dispatch(userLoggedOut());
      }
    }
    setAuthCheck(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes = null;
  if (!userId) {
    routes = (
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<BurgerBuilder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return (
    authCheck && (
      <div>
        <Router>
          <Layout>{routes}</Layout>
        </Router>
      </div>
    )
  );
}

export default App;

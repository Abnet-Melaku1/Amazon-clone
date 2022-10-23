import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import React, { useEffect } from "react";
import { useStateValue } from "./contexts/StateProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
function App() {
  const [{}, dispatch] = useStateValue();
  const promise = loadStripe(
    "pk_test_51LjSvOFbbIsGrK3OjScAq8As7XLYmkB2rv4UjdWGCMrN2GFLA5JpVQ310CcZMKdHK6NZJEDHq9O3mnSODWVpm1Vi00spo4c1xE"
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // const uid = user.uid;
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user,
        });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        console.log("the user is logged out");
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/Payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

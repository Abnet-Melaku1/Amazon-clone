import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Header.css";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import { auth } from "../firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(basket.length);

  function signout() {
    // Sign-out successful.
    if (user) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("sign-out successful");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    }
  }
  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="search">
        <input type="search" className="search_input" />
        <div className="search_icon">
          <SearchIcon />
        </div>
      </div>
      <Link to={user ? "" : "/login"} className="signup__link">
        <div className="options" onClick={signout}>
          <p>
            Hello,{user ? user.email : "Guest"}
            <br />
            {user ? "sign Out" : "sign In"}
          </p>
        </div>
      </Link>
      <Link to="/orders" className="return__link">
        <div className="returnsandorder">
          <p>
            Returns <br />
            <strong>& Orders</strong>
          </p>
        </div>
      </Link>
      <Link to="/checkout" className="cart__link">
        <div className="cart_icon">
          <p className="numberofitems">{basket.length}</p>

          <ShoppingCartOutlinedIcon fontSize="" className="cart__icon" />
        </div>
      </Link>
    </header>
  );
}

export default Header;

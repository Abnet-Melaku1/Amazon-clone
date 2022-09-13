import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      />
      <div className="search">
        <input type="search" className="search_input" />
        <div className="search_icon">
          <SearchIcon />
        </div>
      </div>
      <div className="options">
        <p>
          Hello,
          <br />
          sign in
        </p>
      </div>
      <div className="returnsandorder">
        <p>
          Returns <br />
          <strong>& Orders</strong>
        </p>
      </div>

      <div className="cart_icon">
       
          <bold className="numberofitems">0</bold>
      
        <ShoppingCartOutlinedIcon fontSize="" className="cart__icon" />
      </div>
    </header>
  );
}

export default Header;

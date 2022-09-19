import React from "react";
import "./Emptycart.css";
function Emptycart() {
  return (
    <div className="container">
      <div>
        <img
          src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
          alt="empty"
          className="container__img"
        />
      </div>
      <div className="description">
        <h1>Your Amazon cart is empty</h1>
        <div className="signup_button">
          <button>Sign in to your account</button>
          <button>sign up now</button>
        </div>
      </div>
    </div>
  );
}

export default Emptycart;

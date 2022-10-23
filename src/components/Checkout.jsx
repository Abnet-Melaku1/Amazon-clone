import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import Product from "./Product";
import { useStateValue } from "../contexts/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Emptycart from "./Emptycart";
function Checkout(props) {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout__page">
      <div>
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h3 className="checkout__welcome">
          Hello ,{user ? user.email : "Guest"}
        </h3>
      </div>
      <div className="checkout">
        {basket.length == 0 && (
          <div className="empty__cart">
            {" "}
            <Emptycart />
          </div>
        )}
        {basket.length != 0 && (
          <div className="checkout__left">
            <h3 className="checkout__title">Shopping Cart</h3>
            {basket.map((bas) => (
              <CheckoutProduct
                title={bas.title}
                img={bas.image}
                price={bas.price}
                rating={bas.rating}
                id={bas.id}
              />
            ))}
          </div>
        )}
        <div className="checkout__right">
          {basket.length != 0 && <Subtotal />}
        </div>
      </div>
    </div>
  );
}

export default Checkout;

import React from "react";
import { Rating } from "react-simple-star-rating";
import { useStateValue } from "../contexts/StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct(props) {
  const [{ basket }, dispatch] = useStateValue();
  function removeFromBasket() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  }

  return (
    <>
      <div className="Checkoutproduct_detail">
        <div className="ch">
          <div className="checkoutProduct__all">
            <div className="Checkoutproduct__image">
              <img src={props.img} alt="" className="prouct_img" />
            </div>

            <div className="checkoutProduct__second">
              <p className="Checkoutproduct_title">{props.title}</p>
              <p className="Checkoutproduct_price">
                <small>$</small>
                {props.price}
              </p>

              <Rating
                size={18}
                fillColor="#ffa41c"
                initialValue={props.rating}
                /* Available Props */ className="rating"
              />
              <button onClick={removeFromBasket} className="remove__button">
                Remove from basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutProduct;

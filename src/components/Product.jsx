import React from "react";
import "./Product.css";

import { Rating } from "react-simple-star-rating";
import { useStateValue } from "../contexts/StateProvider";
function Product(props) {
  const [{ basket }, dispatch] = useStateValue();

  function addToBasket() {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        image: props.img,
        price: props.price,
        rating: props.rating,
      },
    });
  }

  return (
    <>
      <div className="product">
        <div className="product__detail">
          <p className="product_title">{props.title}</p>
          <p className="product_price">
            <small>$</small>
            <strong> {props.price}</strong>
          </p>
          <Rating
            size={18}
            fillColor="#ffa41c"
            initialValue={props.rating}
            /* Available Props */ className="rating"
          />
        </div>
        <div className="product__image">
          <img src={props.img} alt="" className="prouct_img" />
          <button onClick={addToBasket} className="add_to_btn">
            Add to basket
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;

import React from "react";
import "./Product.css";

import { Rating } from "react-simple-star-rating";
function Product(props) {
  return (
    <>
      <div className="product_detail">
        <p className="product_title">{props.title}</p>
        <p className="product_price">{props.price}</p>
        <div className="product__image">
          <img src={props.img} alt="" className="prouct_img" />
        </div>
        <Rating
          size={18}
          fillColor="#ffa41c"
          initialValue={props.rating}
          /* Available Props */ className="rating"
        />
      </div>
    </>
  );
}

export default Product;

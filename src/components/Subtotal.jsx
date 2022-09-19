import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

import { useStateValue } from "../contexts/StateProvider";
function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  function getTotoalPrice(baskets) {
    console.log(baskets);
    let sum = 0;
    baskets.forEach((basket) => (sum += parseFloat(basket.price)));
    return sum;
  }
  let final = getTotoalPrice(basket);
  console.log("final" + final);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <div className="subtotal__details">
              <p>subtotal:</p>
              <span>({basket.length}</span>
              <span>items):</span>
              <span>price:</span>
              <span>{value}</span>
            </div>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={getTotoalPrice(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button className="button">Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;

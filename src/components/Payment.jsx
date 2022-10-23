import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import axios from "../axios";
import CheckoutProduct from "./CheckoutProduct";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import CurrencyFormat from "react-currency-format";
import { db } from "../firebase";
let paymentId;
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  function getTotoalPrice(baskets) {
    console.log(baskets);
    let sum = 0;
    baskets.forEach((basket) => (sum += parseFloat(basket.price)));
    return sum;
  }

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getTotoalPrice(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (clientSecret) {
      setProcessing(true);
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          // paymentIntent = payment confirmation

          // db.collection("users")
          //   .doc(user?.uid)
          //   .collection("orders")
          //   .doc(paymentIntent.id)
          //   .set({
          //     basket: basket,
          //     amount: paymentIntent.amount,
          //     created: paymentIntent.created,
          //   });
          paymentId = paymentIntent.id;
          console.log("This is client secrete Dude---->", paymentIntent.id);

          if (user) {
            try {
              // import { doc, setDoc } from "firebase/firestore";

              // const cityRef = doc(db, 'users', user?.uid);
              // const all=cityRef("orders",paymentIntent.id)
              // setDoc(cityRef, { capital: true }, { merge: true });
              const dbRef = doc(db, "users", user?.uid);

              const data = {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
              };
              setDoc(dbRef, data)
                .then(() => {
                  console.log("Document has been added successfully");
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }

          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch({
            type: "EMPTY_BASKET",
          });
          navigate("/orders");
        });
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                img={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              {clientSecret && <CardElement onChange={handleChange} />}
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getTotoalPrice(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export { paymentId };
export default Payment;

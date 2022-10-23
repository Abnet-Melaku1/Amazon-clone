import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Order from "./Order";
import "./Orders.css";
import {
  collection,
  getDocs,
  orderBy,
  where,
  query,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { paymentId } from "./Payment";
import { useStateValue } from "../contexts/StateProvider";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    console.log("from orders", paymentId);
    if (user) {
      async function name() {
        const docRef = doc(db, "users", user?.uid);

        try {
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          setOrders(docSnap.data());
        } catch (error) {
          console.log(error);
        }

        // const docSnap = await getDoc(docRef);
        // try {
        //   const docSnap = await getDoc(docRef);
        //   console.log(docSnap.data());
        // } catch (error) {
        //   console.log(error);
        // }
      }
      name();

      // db.collection("users")
      //   .doc(user?.uid)
      //   .collection("orders")
      //   .orderBy("created", "desc")
      //   .onSnapshot((snapshot) =>
      //     snapshot.docs.map((doc) => console.log(doc.data()))
      //   );
      //
      // const snap = async () => {
      //   const docRef = doc(db, "users", user?.uid, "orders");

      //   const q = query(docRef, orderBy("created"), "desc");
      //   const docsSnap = await getDocs(q);
      //   // console.log(docsSnap);
      //   docsSnap.forEach((doc) => {
      //     console.log(doc.id);
      //     console.log(doc.data());
      //   });
      // };
      // console.log(orders);
      // snap();
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        <Order order={orders} />
      </div>
    </div>
  );
}

export default Orders;

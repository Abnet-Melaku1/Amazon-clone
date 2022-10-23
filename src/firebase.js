// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtdD3Pqib0BOrJQaGw7IDz4yhn9aqnuJg",
  authDomain: "clone-354be.firebaseapp.com",
  projectId: "clone-354be",
  storageBucket: "clone-354be.appspot.com",
  messagingSenderId: "915540278833",
  appId: "1:915540278833:web:29594a61df775ce44d1f10",
  measurementId: "G-6BRJVPBJYT",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);
export { auth, db };

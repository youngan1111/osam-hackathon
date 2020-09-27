import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbQaV-FxAjXK3m8SE5LJBhn9IoOwEqaVc",
  authDomain: "reservsportsfacility.firebaseapp.com",
  databaseURL: "https://reservsportsfacility.firebaseio.com",
  projectId: "reservsportsfacility",
  storageBucket: "reservsportsfacility.appspot.com",
  messagingSenderId: "337057661600",
  appId: "1:337057661600:web:d46ac1ab76f157c58f3fc5",
  measurementId: "G-2HR2HL64D7",
};

firebase.initializeApp(firebaseConfig);
const firestore = new firebase.firestore();

export { firestore };

import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.firestore = app.firestore();
    this.auth = app.auth();
    this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);
  }

  

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doCreateUserWithEmailAndPassword(email, password){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignOut(){
    return this.auth.signOut()
  }
}

export default new Firebase();

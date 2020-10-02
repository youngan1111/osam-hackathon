import React, { useEffect, useState } from "react";
import app from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if (pending) {
    return <>Loading...</>
  }

  const childFunction = () => {
    props.parentFunction(currentUser);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {childFunction()}
      {props.children}
    </AuthContext.Provider>
  );
};
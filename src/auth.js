import React, { useEffect, useState } from "react";
import app from "./firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    return <CircularProgress />
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
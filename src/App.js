import React from "react";
import "./App.css";
import Bars from "./fontawesome/bars";
import Twitter from "./fontawesome/twitter";
import Facebook from "./fontawesome/facebook";
import Reservation from "./reservation";
import ShowReservation from "./showReservation";
import IndexPage from "./indexPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar__logo">
            <i className="fab fa-accusoft"></i>
            <NavLink exact to="/">
              체육시설 예약체계
            </NavLink>
          </div>

          <ul className="navbar__menu">
            <li>
              <NavLink to="/reservation">Reservation</NavLink>
            </li>
            <li>
              <NavLink to="/showReservation">Show reservation</NavLink>
            </li>
          </ul>

          <ul className="navbar__icons">
            <li>
              <Twitter />
            </li>
            <li>
              <Facebook />
            </li>
          </ul>

          <Bars />
        </nav>
      </div>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route path="/reservation">
          <Reservation />
        </Route>
        <Route path="/showReservation">
          <ShowReservation />
        </Route>
        <Route path="/">
          <h2>Not found</h2>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

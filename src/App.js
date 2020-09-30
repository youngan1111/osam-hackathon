import React from "react";
import "./App.css";
import Bars from "./fontawesome/bars";
import Edit from "./fontawesome/edit";
import User from "./fontawesome/user";
import Login from "./fontawesome/login";
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
            <NavLink exact to="/">
              <i><Edit/></i>
              &nbsp;체육시설 예약체계
            </NavLink>
          </div>

          <ul className="navbar__menu">
            <li>
              <NavLink to="/reservation">예약신청</NavLink>
            </li>
            <li>
              <NavLink to="/showReservation">예약확인</NavLink>
            </li>
            <li>
              <NavLink to="/reservation">게시판</NavLink>
            </li>
            <li>
              <NavLink to="/showReservation">마이페이지</NavLink>
            </li>
          </ul>

          <ul className="navbar__icons">
            <li>
              <User/>
              <NavLink>&nbsp;회원가입</NavLink>
            </li>
            <li>
              <Login/>
              <NavLink>&nbsp;로그인</NavLink>
            </li>
          </ul>

          <Bars/>
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

import React from "react";
import "./App.css";
import Bars from "./fontawesome/bars";
import Edit from "./fontawesome/edit";
import User from "./fontawesome/user";
import Login from "./fontawesome/login";
import Logout from "./fontawesome/logout";
// import ReservationDepricated from "./reservationDeprecated";
import IndexPage from "./indexPage";
import PrivateRoute from './privateRoute'
import SignUp from './signUp'
import SignIn from './signIn'
import CampList from './campList'
import Checkout from './reservation'
import Reservation from './reservation'
import app from "./firebase"
import { AuthProvider } from './auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const App = () => {
  const [isLogined, setIsLogined] = React.useState(false);

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) setIsLogined(true);
      else setIsLogined(false)
    });
  })

  return (
    <AuthProvider>
      <Router>
        <div className="responsive_nav">
          <nav className="navbar">
            <div className="navbar__logo">
              <NavLink exact to="/">
                <i><Edit /></i>
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
                <NavLink to="/checkout">마이페이지</NavLink>
              </li>
            </ul>

            <ul className="navbar__icons">
              <li>
                <User />
                {isLogined ?
                  <span>&nbsp;내정보</span> :
                  <NavLink to="/signUp">&nbsp;회원가입</NavLink>
                }
              </li>
              {isLogined ?
                <li>
                  <Logout />
                  <a href="#logout" onClick={() => app.auth().signOut()}>&nbsp;로그아웃</a>
                </li> :
                <li>
                  <Login />
                  <NavLink to="/login">&nbsp;로그인</NavLink>
                </li>
              }
            </ul>
            <Bars />
          </nav>
        </div>

        <Switch>
          <Route exact path="/" component={IndexPage} />

          <PrivateRoute path="/reservation" component={Reservation} />

          <Route path="/showReservation" component={CampList} />

          <Route path="/login" component={SignIn} />

          <Route path="/signUp" component={SignUp} />

          <Route path="/checkout" component={Checkout} />

          <Route path="/">
            <h2>Not found</h2>
          </Route>

        </Switch>

      </Router>
    </AuthProvider>
  );
};

export default App;


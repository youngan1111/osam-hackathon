import React from "react";
import "./App.css";
import Bars from "./fontawesome/bars";
import Edit from "./fontawesome/edit";
import User from "./fontawesome/user";
import Login from "./fontawesome/login";
import Logout from "./fontawesome/logout";
import PrivateRoute from "./privateRoute";
import SignUp from "./signUp";
import SignIn from "./signIn";
import MyInfoPage from "./myInfoPage";
import AddFacility from "./addFacility";
import AddCamp from "./addCamp";
import CampList from "./campList";
import Checkout from "./reservation";
import Reservation from "./reservation";
import app from "./firebase";
import { AuthProvider, AuthContext } from "./auth";
import Divider from "@material-ui/core/Divider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import BackgroundImage from "./backgroundImage";
import GridContainer from "./gridContainer.js";
import GridItem from "./gridItem.js";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  },
  title: {
    margin: "1.75rem 0 0.875rem",
    fontWeight: "700",
    fontFamily: `"Jua", sans-serif`,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#0f4c8133",
    },
    "&:active": {
      backgroundColor: "#0f4c8133",
    },
  },
}))(MenuItem);

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="responsive_nav">
          <nav className="navbar">
            <div className="navbar__logo">
              <NavLink exact to="/">
                <i>
                  <Edit />
                </i>
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
              <AuthContext.Consumer>
                {({ currentUser, userInfo }) => {
                  if (currentUser && userInfo.admin === true) {
                    return (
                      <div>
                        <li>
                          <NavLink to="/addCamp" onClick={handleClick}>
                            관리자페이지
                          </NavLink>
                        </li>
                        <StyledMenu
                          id="customized-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <StyledMenuItem
                            id="fistSmallMenu"
                            style={{
                              padding: 0,
                            }}
                          >
                            <NavLink
                              to="/addCamp"
                              style={{
                                padding: "6px 16px",
                                display: "inline-block",
                              }}
                            >
                              부대 관리
                            </NavLink>
                          </StyledMenuItem>
                          <StyledMenuItem
                            style={{
                              padding: 0,
                            }}
                          >
                            <NavLink
                              to="/addFacility"
                              style={{
                                padding: "6px 16px",
                                display: "inline-block",
                              }}
                            >
                              체육시설 관리
                            </NavLink>
                          </StyledMenuItem>
                        </StyledMenu>
                      </div>
                    );
                  }
                }}
              </AuthContext.Consumer>
            </ul>

            <ul className="navbar__icons">
              <li>
                <User />
                <AuthContext.Consumer>
                  {({ currentUser }) =>
                    currentUser ? (
                      <NavLink to="/myInfoPage">&nbsp;내정보</NavLink>
                    ) : (
                      <NavLink to="/signUp">&nbsp;회원가입</NavLink>
                    )
                  }
                </AuthContext.Consumer>
              </li>

              <AuthContext.Consumer>
                {({ currentUser }) =>
                  currentUser ? (
                    <li>
                      <Logout />
                      <NavLink
                        to="/"
                        onClick={() => {
                          app.auth().signOut();
                        }}
                      >
                        &nbsp;로그아웃
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <Login />
                      <NavLink to="/login">&nbsp;로그인</NavLink>
                    </li>
                  )
                }
              </AuthContext.Consumer>
            </ul>
            <Bars />
          </nav>
        </div>
        <Divider />

        <Switch>
          <Route exact path="/">
            <BackgroundImage filter image={require("./assets/bg.jpg")}>
              <div className={classes.container}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <h1 className={classes.title}>
                      국군장병들의 건강한 체육활동을 위하여
                    </h1>
                    <h4>
                      간부 병 상관없이 누구나 확률적으로 즐길수있는 공정한
                      체육시설예약체계 각 부대에서 있는 체육대회에도 많은 관심
                      부탁드립니다.
                    </h4>
                  </GridItem>
                </GridContainer>
              </div>
            </BackgroundImage>
          </Route>

          <PrivateRoute path="/reservation" component={Reservation} />

          <Route path="/showReservation" component={CampList} />

          <Route path="/login" component={SignIn} />

          <Route path="/myInfoPage" component={MyInfoPage} />

          <Route
            path="/addFacility"
            component={AddFacility}
            // render={() => <AddFacility user={currentUser} />}
          />

          <Route path="/addCamp" component={AddCamp} />

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

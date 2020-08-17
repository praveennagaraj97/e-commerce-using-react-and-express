import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "animate.css";

import TopHeader from "./Header/TopHeader";
import SecondaryHeader from "./Header/SecondaryHeader";
import Notifer from "./Notifer";
import "../styles/app.scss";
import { navItems } from "../data";
import Pages from "./Pages";
import SignUpAndLogin from "./User/SignUpAndLogin";
import history from "../history";

const { Home, Supreme, LexaPay, Service, Orders, Cart } = Pages;

const App = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
  });

  useEffect(() => {
    const auth_token = window.localStorage.getItem("auth_token");

    if (auth_token) console.log(auth_token);
  }, []);

  return (
    <div>
      <Router history={history}>
        <TopHeader windowWidth={windowWidth} />
        <SecondaryHeader navItems={navItems} windowWidth={windowWidth} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/service' component={Service} />
          <Route exact path='/lexapay' component={LexaPay} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/supreme' component={Supreme} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/user_auth' component={SignUpAndLogin} />
        </Switch>
      </Router>
      <Notifer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);

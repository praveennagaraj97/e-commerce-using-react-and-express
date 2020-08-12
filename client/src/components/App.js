import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "animate.css";

import TopHeader from "./Header/TopHeader";
import SecondaryHeader from "./Header/SecondaryHeader";
import "../styles/app.scss";
import { navItems } from "../data/navLinks";
import Pages from "./Pages";

const { Home, Supreme, LexaPay, Service, Orders, Cart } = Pages;
const history = createBrowserHistory();

export default () => {
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

  return (
    <div>
      <Router history={history}>
        <TopHeader windowWidth={windowWidth} />
        <SecondaryHeader navItems={navItems} windowWidth={windowWidth} />
        <Route exact path='/' component={Home} />
        <Route path='/service' component={Service} />
        <Route path='/lexapay' component={LexaPay} />
        <Route path='/orders' component={Orders} />
        <Route path='/supreme' component={Supreme} />
        <Route path='/cart' component={Cart} />
      </Router>
    </div>
  );
};

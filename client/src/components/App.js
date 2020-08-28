import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "animate.css";

import TopHeader from "./Header/TopHeader";
import SecondaryHeader from "./Header/SecondaryHeader";
import Notifer from "./Notifer";
import "../styles/app.scss";
import { navItems } from "../data";
import Pages from "./Pages";
import SignUpAndLogin from "./User/SignUpAndLogin";
import ProductCategories from "./Product/ProductCategories";

import ProductDisplay from "./Product/ProductDisplay";

import history from "../history";

const { Home, Supreme, LexaPay, Service, Orders, Cart } = Pages;

const displayProductCategory = [...Object.keys(Pages)]
  .filter((each) => each !== "Cart")
  .map((each) => each.toLowerCase());

const App = () => {
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

  const handleScrollTotop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div>
      <Router history={history}>
        <div className='header-container'>
          <TopHeader windowWidth={windowWidth} />
          <SecondaryHeader navItems={navItems} windowWidth={windowWidth} />

          <div className='product-categories'>
            <ProductCategories
              displayProductCategory={displayProductCategory}
            />
          </div>
        </div>
        <div className='contents-section'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/service' component={Service} />
            <Route exact path='/lexapay' component={LexaPay} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/supreme' component={Supreme} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/user_auth' component={SignUpAndLogin} />
            <Route
              exact
              path='/category/:categoryName'
              component={ProductDisplay}
            />
          </Switch>
          <img
            onClick={handleScrollTotop}
            className='scroll-up-btn__mobile-screen_only'
            src='https://img.icons8.com/bubbles/100/000000/up.png/'
            alt='scrollup'
          />
        </div>
      </Router>
      <Notifer />
    </div>
  );
};

export default App;

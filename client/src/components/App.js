import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "animate.css";

import Header from "./Header";
import Notifer from "./Notifer";
import "../styles/app.scss";
import { navItems } from "../data";
import Pages from "./Pages";
import SignUpAndLogin from "./User/SignUpAndLogin";
import ResetPassword from "./User/ResetPassword";
import ProductCategories from "./Product/ProductCategories";
import { useWindowSize } from "../utils/useWindowResizeHook";
import ProductList from "./Product/ProductsList";
import Chat from "./Chat";

import history from "../history";

const {
  Home,
  DevelopersTab,
  Service,
  Orders,
  Cart,
  ProductDetailView,
  Settings,
} = Pages;

const displayProductCategory = [...Object.keys(Pages)]
  .filter((each) => each !== "Cart")
  .map((each) => each.toLowerCase());

const App = () => {
  const handleScrollTotop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <Router history={history}>
        <div id='section-header' className='header-container'>
          <Header navItems={navItems} />

          <div className='product-categories'>
            <ProductCategories
              displayProductCategory={displayProductCategory}
            />
          </div>
        </div>
        <div id='section-content' className='contents-section'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/service' component={Service} />
            <Route exact path='/devs' component={DevelopersTab} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/user_auth' component={SignUpAndLogin} />
            <Route exact path='/user_auth/:token' component={ResetPassword} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/service/chat' component={Chat} />
            <Route
              exact
              path='/category/:categoryName'
              component={ProductList}
            />
            <Route
              exact
              path='/:categoryName/detail'
              component={ProductDetailView}
            />
            <Route
              path='*'
              component={() => (
                <h1 style={{ color: "white", textAlign: "center" }}>
                  Page Not Found
                </h1>
              )}
            />
          </Switch>
          {useWindowSize().width < 1025 ? (
            <img
              onClick={handleScrollTotop}
              className='scroll-up-btn__mobile-screen_only'
              src='https://img.icons8.com/bubbles/100/000000/up.png/'
              alt='scrollup'
            />
          ) : (
            ""
          )}
        </div>
      </Router>
      <Notifer />
      {/* <footer
        style={{
          height: "5vh",
          backgroundColor: "white",
          margin: "0px 5px",
          position: "relative",
          bottom: "0",
        }}>
        @Lexa
      </footer> */}
    </>
  );
};

export default App;

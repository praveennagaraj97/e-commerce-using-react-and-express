import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "../history";
import "animate.css";

import "../styles/app.scss";
import Login from "./User";
import Header from "./Header";
import HomePage from "./Home";
import Notifier from "./Notifier";
import { KeyBoarders, Manufacturer } from "./Works";
import {
  AddNewProductCategory as AddCategory,
  DeleteCategory,
  EditCategory,
  AddNewProduct,
  GetMyOrders,
  UpdateProductQuantity,
} from "./WorkSpaces";

const App = () => {
  return (
    <>
      <Header />
      <Router history={history}>
        <div style={{ margin: "5px" }}>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/auth' component={Login} exact />
            <Route path='/keyboarders' component={KeyBoarders} exact />
            <Route path='/addCategory' component={AddCategory} exact />
            <Route path='/editCategory' component={EditCategory} exact />
            <Route path='/deleteCategory' component={DeleteCategory} exact />

            <Route path='/addNewProduct' component={AddNewProduct} exact />
            <Route path='/getOrders' component={GetMyOrders} exact />
            <Route
              path='/updateProduct'
              component={UpdateProductQuantity}
              exact
            />

            <Route path='/manufacturer' component={Manufacturer} exact />
          </Switch>
        </div>
      </Router>
      <Notifier />
    </>
  );
};

export default App;

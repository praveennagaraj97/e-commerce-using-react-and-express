import React from "react";

import { devRoleChecker } from "../../helper";
import history from "../../history";
import "../../styles/keyboarder.scss";

const Manufacturer = () => {
  return (
    <div className='keyboarder-roles-container'>
      <div className='role__products-category-crud'>
        <p>Product Options</p>
        <div className='options'>
          <div
            onClick={() => history.push("/addNewProduct")}
            className='option__add option'
          >
            Add New Product
          </div>
          <div
            onClick={() => history.push("/getOrders")}
            className='option__add option'
          >
            Get Orders
          </div>
          <div
            onClick={() => history.push("/updateProduct")}
            className='option__add option'
          >
            Update Product Quantity
          </div>
        </div>
      </div>
    </div>
  );
};

const manufacturerWrapped = () =>
  devRoleChecker({ role: "manufacturer" })(Manufacturer);

export default manufacturerWrapped;

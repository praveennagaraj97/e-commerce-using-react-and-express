import React from "react";
import { devRoleChecker } from "../../../../helper";
import AddProductModel from "./AddProductModel";

const AddNewProduct = () => {
  return (
    <div className='add-new-products-container'>
      <AddProductModel />
    </div>
  );
};

export default () =>
  devRoleChecker({
    role: "manufacturer",
  })(AddNewProduct);

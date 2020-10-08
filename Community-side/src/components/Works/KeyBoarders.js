import React from "react";

import { devRoleChecker } from "../../helper";
import history from "../../history";
import "../../styles/keyboarder.scss";

const KeyBoarders = () => {
  return (
    <div className='keyboarder-roles-container'>
      <div className='role__products-category-crud'>
        <p>Product Categories Options</p>
        <div className='options'>
          <div
            onClick={() => history.push("/addCategory")}
            className='option__add option'
          >
            Add New Category
          </div>
          <div
            className='option__edit option'
            onClick={() => history.push("/editCategory")}
          >
            Edit Category
          </div>
          <div
            className='option__delete option'
            onClick={() => history.push("/deleteCategory")}
          >
            Delete Category
          </div>
        </div>
      </div>
    </div>
  );
};

const KeyBoardersWrapped = () =>
  devRoleChecker({ role: "keyboarders" })(KeyBoarders);

export default KeyBoardersWrapped;

import React, { Fragment } from "react";
import { connect } from "react-redux";
import history from "../../history";

import "../../styles/productCategories.scss";

export const ProductCategories = ({ categories }) => {
  const selectCategoryOnClick = (categoryName) => {
    history.push(`/${categoryName.toLowerCase()}`);
  };

  return (
    <Fragment>
      {categories
        ? categories.map(({ categoryName, _id, categoryIcon }) => {
            return (
              <Fragment key={_id}>
                <div
                  className='product-category-container'
                  onClick={() => selectCategoryOnClick(categoryName)}>
                  <div className='product-category-item'>
                    <img
                      className='product-category-item__icon'
                      src={categoryIcon}
                      alt={categoryName}
                    />
                  </div>
                  <p className='product-category-item__title'>{categoryName}</p>
                </div>
              </Fragment>
            );
          })
        : ""}
    </Fragment>
  );
};

const mapStateToProps = ({ productCategories: { categories } }) => ({
  categories,
});

export default connect(mapStateToProps)(ProductCategories);

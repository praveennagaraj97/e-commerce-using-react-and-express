import React, { Fragment } from "react";
import { connect } from "react-redux";

import history from "../../history";
import { loadGetProductsOnQuery } from "../../actions";

import "../../styles/productCategories.scss";

export const ProductCategories = ({
  categories,
  loadProductsRelatedToCategoryClicked,
}) => {
  const selectCategoryOnClick = (categoryName, category_id) => {
    history.push(`/category/${categoryName.toLowerCase()}`);
    const query = `?categoryId=${category_id}`;
    loadProductsRelatedToCategoryClicked(query);
  };

  return (
    <Fragment>
      {categories
        ? categories.map(({ categoryName, _id, categoryIcon }) => {
            return (
              <Fragment key={_id}>
                <div
                  className='product-category-container'
                  onClick={() => {
                    selectCategoryOnClick(categoryName, _id);
                  }}>
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

const mapDispatchToProps = (dispatch) => ({
  loadProductsRelatedToCategoryClicked: (query) =>
    dispatch(loadGetProductsOnQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);

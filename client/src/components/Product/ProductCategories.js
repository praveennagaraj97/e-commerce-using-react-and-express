import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import { GET_ALL_CATEGORIES } from "../../graphql";
import "../../styles/productCategories.scss";
import history from "../../history";
import { loadGetProductsOnQuery } from "../../actions";
import { scrollToTop } from "../../utils/scrollTopOnRouteChange";

const ProductCategories = () => {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
  const dispatch = useDispatch();

  const selectCategoryOnClick = (categoryName, category_id) => {
    history.push(`/category/${categoryName.toLowerCase()}`);
    const query = `?categoryId=${category_id}`;
    dispatch(loadGetProductsOnQuery(query));
    scrollToTop();
  };

  if (error) {
    return (
      <h2 style={{ textAlign: "center", color: "white" }}>
        Something went wrong Please Comeback later
      </h2>
    );
  }

  if (loading)
    return (
      <div className='category-loader'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
          alt='loader'
        />
      </div>
    );

  if (data)
    return (
      <>
        {data
          ? data.getAllCategories.map(({ categoryName, _id, categoryIcon }) => {
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
                    <p className='product-category-item__title'>
                      {categoryName}
                    </p>
                  </div>
                </Fragment>
              );
            })
          : ""}
      </>
    );
};

export default ProductCategories;

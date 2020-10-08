import React from "react";
import { useDispatch } from "react-redux";

import history from "../../history";
import { loadGetProductsOnQuery } from "../../actions";

import { GET_ALL_CATEGORIES } from "../../graphql";

import "../../styles/productCategories.scss";
import { useQuery } from "@apollo/client";

export const ProductCategories = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);

  const dispatch = useDispatch();

  // dispatch(loadGetProductsOnQuery(query)
  const selectCategoryOnClick = (categoryName, category_id) => {
    history.push(`/category/${categoryName.toLowerCase()}`);

    dispatch(loadGetProductsOnQuery(`?categoryId=${category_id}`));

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  if (loading) {
    return (
      <div className='category-loader'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
          alt='loader'
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='category-loader'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
          alt='loader'
        />
      </div>
    );
  }

  if (data)
    return (
      <>
        {data.getAllCategories.map(({ _id, categoryIcon, categoryName }) => {
          return (
            <div
              key={_id}
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
          );
        })}
      </>
    );
};

export default ProductCategories;

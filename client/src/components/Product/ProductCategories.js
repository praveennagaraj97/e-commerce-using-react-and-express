import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import history from "../../history";
import "../../styles/productCategories.scss";

export const ProductCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCategoryClick = (title) => {
    history.push(`/categories/${title}`);
  };

  return (
    <Fragment>
      {categories.map(({ title, icon }) => {
        return (
          <Fragment key={title}>
            <div
              onClick={() => onCategoryClick(title)}
              className='product-category-container'>
              <div className='product-category-item'>
                <img
                  className='product-category-item__icon'
                  src={icon}
                  alt={title}
                />
              </div>
              <p className='product-category-item__title'>{title}</p>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default ProductCategories;

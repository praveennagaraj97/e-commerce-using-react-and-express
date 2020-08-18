import React, { Fragment } from "react";

import "../../styles/homeCategories.scss";
import ProductCategories from "../Product/ProductCategories";
import ProductAdvertisementBoard from "../Product/ProductAdvertisementBoard";

const Categories = () => {
  return (
    <Fragment>
      <div className='home-page-categories'>
        <ProductCategories />
      </div>
      <h1 style={{ textAlign: "center", color: "wheat" }}>
        <span>Everything you love,</span>
        <span>is online.</span>
      </h1>

      <ProductAdvertisementBoard />
    </Fragment>
  );
};

export default Categories;

import React, { Fragment } from "react";

import ProductAdvertisementBoard from "../Product/ProductAdvertisementBoard";

const HomePage = () => {
  return (
    <Fragment>
      <h1 style={{ textAlign: "center", color: "wheat" }}>
        <span>Everything you love,</span>
        <span>is online.</span>
      </h1>
      <ProductAdvertisementBoard />
    </Fragment>
  );
};

export default HomePage;

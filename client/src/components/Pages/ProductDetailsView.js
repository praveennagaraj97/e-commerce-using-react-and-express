import React from "react";

import {
  ProductMobileDetail,
  ProductComputersDetail,
} from "../ProductDetailView";
import history from "../../history";

const ProductDetailView = () => {
  const productCategory = history.location.pathname.split("/")[
    history.location.pathname.split("/").length - 2
  ];
  if (productCategory === "mobiles") return <ProductMobileDetail />;
  if (productCategory === "computers") return <ProductComputersDetail />;
  return <h1>Hello</h1>;
};

export default ProductDetailView;

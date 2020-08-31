import React from "react";

import { ProductMobileDetail } from "../ProductDetailView";
import history from "../../history";

const ProductDetailView = () => {
  const productCategory = history.location.pathname.split("/")[
    history.location.pathname.split("/").length - 2
  ];
  if (productCategory === "mobiles") return <ProductMobileDetail />;
  return <h1>Hello</h1>;
};

export default ProductDetailView;

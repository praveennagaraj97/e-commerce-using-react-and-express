import React from "react";

import {
  ProductMobileDetail,
  ProductComputersDetail,
  ProductElectronicsDetail,
  ProductBeautyDetail,
} from "../ProductDetailView";
import history from "../../history";

const ProductDetailView = () => {
  const productCategory = history.location.pathname.split("/")[
    history.location.pathname.split("/").length - 2
  ];
  if (productCategory === "mobiles") return <ProductMobileDetail />;
  if (productCategory === "computers") return <ProductComputersDetail />;
  if (productCategory === "electronics") return <ProductElectronicsDetail />;
  if (productCategory === "beauty") return <ProductBeautyDetail />;
  return <h1 style={{ color: "white" }}>Sorry Something went Wrong</h1>;
};

export default ProductDetailView;

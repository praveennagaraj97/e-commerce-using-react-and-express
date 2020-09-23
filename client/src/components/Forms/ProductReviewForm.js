import React from "react";

import "../../styles/productReviewForm.scss";
import { ProductMobileReviewFields } from "./helpers";

/**
 * @file - productReviewImages.
 * @description - takes default title,description and images for all types.
 * @access - Protected Route User has to be Logged In to access this component
 */

export const ProductReviewForm = ({ productReviewDetail }) => {
  if (productReviewDetail.category === "mobiles") {
    return (
      <ProductMobileReviewFields productReviewDetail={productReviewDetail} />
    );
  }

  return <h1>Oh</h1>;
};

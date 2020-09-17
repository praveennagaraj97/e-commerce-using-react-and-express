import React, { useState } from "react";

import { loadProductReview } from "../../../actions";
import { useInfiniteScrolling } from "../../../utils/useInfiniteScrolling";
import "../../../styles/productReviewList.scss";
import { connect } from "react-redux";

const ProductReview = ({ loadProductReview, productReviewsList }) => {
  const [reviewVisible, setReviewVisible] = useState(null);

  useInfiniteScrolling(
    reviewVisible,
    () => {
      loadProductReview();
    },
    1
  );

  return (
    <div className='product-review-container' ref={setReviewVisible}>
      <h3>Product Review</h3>
      <pre>{JSON.stringify(productReviewsList, undefined, 2)}</pre>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadProductReview: () => dispatch(loadProductReview()),
});

const mapStateToProps = ({ productReview: { productReviewsList } }) => ({
  productReviewsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);

import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import "../../../styles/productReviewCreate.scss";
import { ProductReviewForm } from "../../Forms";
import { loadNewProductReview } from "../../../actions";

const ProductReviewCreate = ({ loadPostProductReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className='product-review-create-container'>
      <button onClick={() => setShowReviewForm(!showReviewForm)}>
        Write Review
      </button>
      {showReviewForm ? (
        <div className='review-form'>
          <ProductReviewForm postReviewAction={loadPostProductReview} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const reduxFormWrapped = reduxForm({
  form: "productReviewForm",
})(ProductReviewCreate);

const mapDispatchToProps = (dispatch) => ({
  loadPostProductReview: (productType) =>
    dispatch(loadNewProductReview(productType)),
});

export default connect(null, mapDispatchToProps)(reduxFormWrapped);

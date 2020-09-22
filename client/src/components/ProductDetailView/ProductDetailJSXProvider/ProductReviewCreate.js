import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import "../../../styles/productReviewCreate.scss";
import { ProductReviewForm } from "../../Forms";

const ProductReviewCreate = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const setValue = (values) => {
    // console.log(values);
  };

  return (
    <div className='product-review-create-container'>
      <button onClick={() => setShowReviewForm(!showReviewForm)}>
        Write Review
      </button>
      {showReviewForm ? (
        <div className='review-form'>
          <ProductReviewForm setValue={setValue} />
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

export default connect()(reduxFormWrapped);

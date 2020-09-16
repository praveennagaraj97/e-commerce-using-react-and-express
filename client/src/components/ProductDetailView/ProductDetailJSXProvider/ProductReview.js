import React, { useState } from "react";

import { useInfiniteScrolling } from "../../../utils/useInfiniteScrolling";

const ProductReview = () => {
  const [reviewVisible, setReviewVisible] = useState(null);

  useInfiniteScrolling(
    reviewVisible,
    () => {
      console.log("i am visible call the review api");
    },
    1
  );

  return (
    <div className='product-review-container' ref={setReviewVisible}>
      ProductReview
    </div>
  );
};

export default ProductReview;

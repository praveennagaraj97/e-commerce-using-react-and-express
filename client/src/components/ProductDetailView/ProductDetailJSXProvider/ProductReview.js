import React, { Fragment, useState } from "react";

import { ShowRating } from "../../Rating";
import { loadProductReview } from "../../../actions";
import { useInfiniteScrolling } from "../../../utils/useInfiniteScrolling";
import "../../../styles/productReviewList.scss";
import { connect } from "react-redux";

const ProductReview = ({
  loadProductReview,
  productReviewsList,
  reviewLoading,
}) => {
  const [reviewVisible, setReviewVisible] = useState(null);

  useInfiniteScrolling(
    reviewVisible,
    () => {
      loadProductReview();
    },
    1
  );

  /**  @desc Two types of review -
   *  One with images and one without images
   */

  return (
    <Fragment>
      <h3 className='product-review-header' ref={setReviewVisible}>
        Product Reviews
      </h3>
      {!productReviewsList ? (
        <div className='product-review-container'>
          {reviewLoading ? (
            <div className='review-loader'>
              <img
                src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
                alt='loading'
              />
            </div>
          ) : (
            <h4>No Reviews Found</h4>
          )}
        </div>
      ) : (
        <div className='product-review-container'>
          {productReviewsList.map(
            ({
              _id,
              productReviewImages,
              averageReview,
              userId: { name },
              title,
              description,
              createdAt,
            }) => {
              return (
                <div key={_id} className='product-review'>
                  <div className='reviewer'>
                    <img
                      src='https://img.icons8.com/cotton/48/000000/gender-neutral-user.png'
                      alt='reviewer-avatar'
                    />
                    <p>{name || "Lexa Customer"}</p>
                  </div>
                  <div className='rating'>
                    <ShowRating value={averageReview} />
                  </div>
                  <p>Reviewed on {new Date(createdAt).toUTCString()}</p>
                  <div className='title'>{title}</div>
                  <hr />
                  <div className='review'>{description}</div>

                  <div className='review-helpful-or-not'>
                    <p>77 People Found Helpful</p>
                    <button>Found Helpful</button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadProductReview: () => dispatch(loadProductReview()),
});

const mapStateToProps = ({
  productReview: { productReviewsList, reviewLoading },
}) => ({
  productReviewsList,
  reviewLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview);

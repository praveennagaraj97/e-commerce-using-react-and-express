import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "../../styles/productDisplay.scss";

const ProductDisplay = ({ productsList }) => {
  const { products } = productsList;

  const reviewStarRender = (reviewNumber) => {
    let stars = [];
    if (reviewNumber) {
      _.times(parseInt(reviewNumber, 10), (i) =>
        stars.push(
          <img
            key={i}
            className='product-card__reviewstar'
            src='https://img.icons8.com/bubbles/50/000000/star.png'
            alt='review Star'
          />
        )
      );
    } else {
      stars.push(
        <img
          key={Math.random()}
          className='product-card__reviewstar'
          src='https:cdn.shopify.com/s/files/1/2344/9163/files/Not-Rated-Logo_7868b6f7-3a0a-4524-99ce-84a4de15f072_600x.png?v=1504987256'
          alt='review Star'
        />
      );
    }

    return stars;
  };

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className='products-container'>
      {products.length > 0 ? (
        <Fragment>
          {products.map(
            ({ _id, productCoverImage, productName, productPrice }) => {
              return (
                <div key={_id} className='product-card'>
                  <img
                    className='product-card__image'
                    src={productCoverImage}
                    alt={productName}
                  />
                  <div className='product-review-container'>
                    {reviewStarRender(randomIntFromInterval(1, 5)).map(
                      (star) => star
                    )}
                  </div>

                  <h1 className='product-card__title'>{productName}</h1>
                  <p className='product-card__price'>₹{productPrice}</p>
                </div>
              );
            }
          )}
        </Fragment>
      ) : (
        <h1 style={{ color: "white" }}>No Products Found</h1>
      )}
    </div>
  );
};

const mapStateToProps = ({ productsList }) => ({ productsList });

export default connect(mapStateToProps)(ProductDisplay);

/*



*/

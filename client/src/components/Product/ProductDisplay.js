import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { setPageNumber } from "../../actions";
import "../../styles/productDisplay.scss";

const ProductDisplay = ({ productsList, loadMoreResults }) => {
  const { products, query } = productsList;

  const loadMoreResultsOnClick = () => {
    loadMoreResults((productsList.query.pageNumber += 1));
  };

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
                  <div className='product-card__view__cart_btn_option'>
                    <button className='product-card__btn product__cart-btn'>
                      Add To Cart
                    </button>
                    <button className='product-card__btn product__view-btn'>
                      View Product
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </Fragment>
      ) : (
        ""
      )}
      {query.moreResultsAvailable ? (
        <Fragment>
          <p></p>
          <button
            id='elem'
            style={{ justifySelf: "center" }}
            onClick={loadMoreResultsOnClick}>
            Load More
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <p></p>
          <img
            style={{ justifySelf: "center" }}
            src='https://img.icons8.com/nolan/64/empty-box.png'
            alt='empty'
          />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ productsList }) => ({ productsList });

const mapDispatchToProps = (dispatch) => ({
  loadMoreResults: (pageNumber) => dispatch(setPageNumber(pageNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);

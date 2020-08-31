import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  setPageNumber,
  addItemToCart,
  removeItemFromCart,
} from "../../actions";
import "../../styles/productDisplay.scss";

import { useInfiniteScrolling } from "../../utils/useInfiniteScrolling";

const ProductDisplay = ({
  productsList,
  loadMoreResults,
  addItemToCart,
  removeItemFromCart,
}) => {
  const { products, query } = productsList;
  const [element, setElement] = useState(null);

  const loadMoreResultsOnScroll = () => {
    loadMoreResults((query.pageNumber += 1));
  };

  useInfiniteScrolling(element, loadMoreResultsOnScroll);

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

  return (
    <Fragment>
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
                      {reviewStarRender(4).map((star) => star)}
                    </div>

                    <h1 className='product-card__title'>{productName}</h1>
                    <p className='product-card__price'>₹{productPrice}</p>
                    <div className='product-card__view__cart_btn_option'>
                      <button
                        onClick={() => {
                          addItemToCart(_id);
                        }}
                        className='product-card__btn product__cart-btn'>
                        Add To Cart
                      </button>
                      <button
                        onClick={() => removeItemFromCart(_id)}
                        className='product-card__btn product__view-btn'>
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
      </div>
      {products.length > 0 && query.moreResultsAvailable ? (
        <div
          className='products-loading'
          ref={setElement}
          style={{ color: "white" }}>
          <img
            className='loading-spinner-gif'
            src='https://storage.googleapis.com/lexa-component-styles/Curve-Loading.gif'
            alt='Loading...'
          />
        </div>
      ) : products.length > 0 ? (
        <h1 style={{ color: "white", textAlign: "center" }}>End Of Results</h1>
      ) : (
        <h1 style={{ color: "white", textAlign: "center" }}>
          No Results Found
        </h1>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ productsList }) => ({ productsList });

const mapDispatchToProps = (dispatch) => ({
  loadMoreResults: (pageNumber) => dispatch(setPageNumber(pageNumber)),
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);

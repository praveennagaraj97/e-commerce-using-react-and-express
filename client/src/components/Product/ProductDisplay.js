import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { setPageNumber, addItemToCart } from "../../actions";
import "../../styles/productDisplay.scss";

import { useInfiniteScrolling } from "../../utils/useInfiniteScrolling";
import history from "../../history";

const ProductDisplay = ({ productsList, loadMoreResults, addItemToCart }) => {
  const { products, query } = productsList;
  const [element, setElement] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
  });

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
      {windowWidth < 702 ? (
        <div className='products-container-filter-mobile'>
          {/* Filter options */}
          <h3>Filter By Price</h3>
          <h3>SortBy</h3>
          <h3>Availability</h3>
          <h3>Name</h3>
        </div>
      ) : (
        ""
      )}
      <div className='products-container'>
        {windowWidth > 700 ? (
          <div className='products-container-filter-column'>
            {/* Filter options */}
            <h3>Filter By Price</h3>
            <h3>SortBy</h3>
            <h3>Availability</h3>
          </div>
        ) : (
          <></>
        )}
        <div className='product-cards-container'>
          <div className='product-cards'>
            {products.length > 0 ? (
              <Fragment>
                {products.map(
                  ({ _id, productCoverImage, productName, productPrice }) => {
                    return (
                      <div key={_id} className='product-card'>
                        <div className='product-card-image_container'>
                          <img
                            className='product-card__image'
                            src={productCoverImage}
                            alt={productName}
                          />
                        </div>

                        <div className='product-card-contents_container'>
                          <h1 className='product-card__title'>{productName}</h1>
                          <div className='product-review-container'>
                            {reviewStarRender(4).map((star) => star)}
                          </div>
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
                              onClick={() =>
                                history.push(
                                  `/category/${
                                    history.location.pathname.split("/")[
                                      history.location.pathname.split("/")
                                        .length - 1
                                    ]
                                  }/${_id}`
                                )
                              }
                              className='product-card__btn product__view-btn'>
                              View Product
                            </button>
                          </div>
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
        </div>
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
        <h1 style={{ color: "white", textAlign: "center", marginLeft: "20vw" }}>
          End Of Results
        </h1>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import {
  setPageNumber,
  addItemToCart,
  loadViewProductDetail,
} from "../../actions";
import ProductFeatures from "../Product/ProductFeatures";
import { ShowRating } from "../Rating";

import { useInfiniteScrolling } from "../../utils/useInfiniteScrolling";
import { useWindowSize } from "../../utils/useWindowResizeHook";

import history from "../../history";
import "../../styles/productDisplay.scss";

const ProductDisplay = ({
  productsList,
  loadMoreResults,
  addItemToCart,
  loadViewDetail,
  productsLoading,
}) => {
  const { products, query } = productsList;
  const [element, setElement] = useState(null);

  const loadMoreResultsOnScroll = () => {
    loadMoreResults((query.pageNumber += 1));
  };

  useInfiniteScrolling(element, loadMoreResultsOnScroll);

  const handleViewProduct = (id) => {
    const productType = {
      category: history.location.pathname.split("/")[
        history.location.pathname.split("/").length - 1
      ],
      id,
    };

    loadViewDetail(productType);
  };

  const reviewStarRender = (review) => {
    return <ShowRating value={review} />;
  };

  return (
    <Fragment>
      {productsLoading ? (
        <div className='loading-container'>
          <img
            src='https://storage.googleapis.com/lexa-component-styles/loading.gif'
            alt='loading'
          />
        </div>
      ) : (
        ""
      )}

      {useWindowSize().width < 702 ? (
        <div className='products-container-filter-mobile'>
          {/* Filter options */}
        </div>
      ) : (
        ""
      )}
      <div className='products-container'>
        {useWindowSize().width > 700 ? (
          <div className='products-container-filter-column'>
            {/* Filter options */}
            <ProductFeatures />
          </div>
        ) : (
          <></>
        )}
        <div className='product-cards-container'>
          <div className='product-cards'>
            {products.length > 0 ? (
              <Fragment>
                {products.map(
                  ({
                    _id,
                    productCoverImage,
                    productName,
                    productPrice,
                    averageReview,
                  }) => {
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
                            {reviewStarRender(
                              averageReview.length === 0
                                ? 0
                                : averageReview[0].averageReview
                            )}
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
                              onClick={() => handleViewProduct(_id)}
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
        <h1 style={{ color: "white", textAlign: "center" }}>End Of Results</h1>
      ) : (
        <Fragment>
          {!productsLoading ? (
            <h1 style={{ color: "white", textAlign: "center" }}>
              No Results Found
            </h1>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ productsList }) => ({
  productsList,
  productsLoading: productsList.productsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreResults: (pageNumber) => dispatch(setPageNumber(pageNumber)),
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  loadViewDetail: (productType) => dispatch(loadViewProductDetail(productType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);

import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import _ from "lodash";

import "../../styles/productDisplay.scss";
import { withRouter } from "react-router-dom";

const ProductDisplay = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const requestUrl = props.history.location.pathname
      .split("/")[2]
      .toLowerCase();

    try {
      axios.get(`http://localhost:3002/${requestUrl}`).then((response) => {
        setProducts(response.data);
      });
    } catch (err) {
      setProducts([]);
    }
  }, [props.history.location.pathname]);

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
    <div className='products-container'>
      {products.length > 0 ? (
        <Fragment>
          {products.map(
            ({ id, productImage, productName, productPrice, review }) => {
              return (
                <div key={id} className='product-card'>
                  <img
                    className='product-card__image'
                    src={productImage}
                    alt={productName}
                  />

                  {reviewStarRender(review).map((star) => star)}

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

export default withRouter(ProductDisplay);

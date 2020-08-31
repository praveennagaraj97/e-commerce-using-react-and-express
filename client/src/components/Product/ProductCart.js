import React from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";

const ProductCart = ({ productCart }) => {
  if (productCart.hasOwnProperty("productsInCart")) {
    return (
      <div className='product-cart'>
        <div className='product-card-header'>
          <h1>Shopping Cart</h1>
          <h4 className='product-card-header__price'>Price</h4>
        </div>

        <hr />
        {productCart.productsInCart.map(
          (
            { _id, productName, productPrice, productCoverImage, quantity },
            index
          ) => {
            return (
              <div className='product-card__item-box' key={index}>
                <div className='product-card__item-image__container'>
                  <img
                    className='product-card__item-image'
                    src={productCoverImage}
                    alt={productName}
                  />
                </div>
                <div className='product-card__nameandquantity'>
                  <h3>{productName}</h3>
                  <input
                    onChange={() => {}}
                    min={0}
                    className='product-cart-quantity'
                    type='number'
                    max={10}
                    value={quantity}
                  />
                </div>
                <div className='product-card__price'>
                  <h3 className='product-card__item-price'>₹{productPrice}</h3>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  }
  return <></>;
};

const mapStateToProps = ({ productCart }) => ({ productCart });

export default connect(mapStateToProps)(ProductCart);

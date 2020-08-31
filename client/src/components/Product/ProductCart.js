import React from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";
import {
  addItemToCart,
  removeItemFromCart,
  loadProductCart,
} from "../../actions";

const ProductCart = ({ productCart, addItem, removeItem, loadCart }) => {
  if (
    productCart.hasOwnProperty("productsInCart") &&
    productCart.cart.length > 0
  ) {
    return (
      <div className='product-cart'>
        <div className='product-card-header'>
          <h1>Shopping Cart</h1>
          <h4 className='product-card-header__price'>Price</h4>
        </div>

        <hr />
        {productCart.productsInCart.map(
          ({ _id, productName, price, productCoverImage, quantity }, index) => {
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
                  <h4>Qty : {quantity}</h4>
                  <div>
                    <button
                      onClick={() => {
                        addItem(_id);
                        loadCart();
                      }}>
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeItem(_id);
                        loadCart();
                      }}>
                      -
                    </button>
                  </div>
                </div>
                <div className='product-card__price'>
                  <h3 className='product-card__item-price'>₹{price}</h3>
                </div>
              </div>
            );
          }
        )}
        <hr />
        <div className='product-cart-checkout'>
          <h2>Subtotal ({5} item):</h2>
          <h4 className='product-cart-checkout-price'>₹{789655}.00</h4>
        </div>
      </div>
    );
  }
  return <h1 style={{ color: "white" }}>No Items In Cart</h1>;
};

const mapStateToProps = ({ productCart }) => ({ productCart });

const mapDispatchToProps = (dispatch) => ({
  addItem: (id) => dispatch(addItemToCart(id)),
  removeItem: (id) => dispatch(removeItemFromCart(id)),
  loadCart: () => dispatch(loadProductCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);

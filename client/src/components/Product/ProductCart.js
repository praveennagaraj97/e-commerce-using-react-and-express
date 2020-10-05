import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";
import {
  addItemToCart,
  removeItemFromCart,
  loadProductCart,
  loadCheckout,
} from "../../actions";

const ProductCart = ({
  productCart,
  addItem,
  removeItem,
  loadCart,
  loadCheckout,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;

    if (productCart) {
      if (productCart.hasOwnProperty("productsInCart")) {
        for (let i = 0; i < productCart.productsInCart.length; i++) {
          total += productCart.productsInCart[i].price;
        }
      }
    }

    setTotalAmount(total);
  }, [productCart]);

  if (productCart.hasOwnProperty("productsInCart")) {
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
          <div className='sub-total'>
            <p>
              Subtotal ({productCart.cart.length} items) :{totalAmount}
            </p>
          </div>
          <button onClick={loadCheckout}>Checkout</button>
        </div>
      </div>
    );
  }
  return <h1 style={{ color: "white" }}>No Items In Cart</h1>;
};

const mapStateToProps = ({ productCart }) => ({
  productCart,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (id) => dispatch(addItemToCart(id)),
  removeItem: (id) => dispatch(removeItemFromCart(id)),
  loadCart: () => dispatch(loadProductCart()),
  loadCheckout: () => dispatch(loadCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);

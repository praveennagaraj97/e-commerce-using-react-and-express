import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyProduct, updateProductQuantity } from "../../../api";
import { showErrorMessage, showSuccessMessage } from "../../../actions";
import "../../../styles/getOrders.scss";
import { devRoleChecker } from "../../../helper";

const UpdateProductQuantity = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const mfrId = useSelector(({ user: { loggedUser } }) => loggedUser);

  useEffect(() => {
    if (mfrId) {
      (async () => {
        try {
          const {
            data: { details },
          } = await getMyProduct(mfrId._id);
          setProducts(details);
        } catch (err) {
          console.clear();
        }
      })();
    }
  }, [mfrId]);

  const handleProductQuantityUpdate = async (id, name) => {
    if (quantity === 0) {
      dispatch(showErrorMessage("Quantity should be minimum 1"));

      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
      return;
    }

    try {
      await updateProductQuantity(id, { quantity });
      dispatch(showSuccessMessage(`${name}'s quantity set to ${quantity}`));

      const newProductsList = products.map((each) => {
        if (each._id === id) {
          each.quantity = quantity;
          return each;
        }
        return each;
      });

      setProducts(newProductsList);

      setQuantity(1);
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (e) {
      console.clear();
      dispatch(showErrorMessage("Something went wrong"));

      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
    }
  };

  return (
    <div className='orders-container'>
      <h1>Products List</h1>
      {products.map(
        ({ _id, productName, productCoverImage, productPrice, quantity }) => {
          return (
            <div key={_id} className='get-orders-list'>
              <div className='orders__details-box'>
                <div className='prod-image'>
                  <img src={productCoverImage} alt='prd-cover' />
                </div>
                <div className='prod-order-details'>
                  <p className='prd-name'>Product name : {productName}</p>
                  <p className='prd-price'>Product price : {productPrice}</p>
                  <p className='prd-price'>Available Qty : {quantity}</p>
                </div>
                <div className='delivery-status-update'>
                  <input
                    style={{ width: "30px" }}
                    type='number'
                    min={1}
                    onChange={(ev) => setQuantity(Number(ev.target.value))}
                  />
                  <button
                    onClick={() =>
                      handleProductQuantityUpdate(_id, productName)
                    }
                  >
                    Update Quantity
                  </button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default () =>
  devRoleChecker({
    role: "manufacturer",
  })(UpdateProductQuantity);

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getMyOrders, updateUserOrder } from "../../../api";
import { showErrorMessage, showSuccessMessage } from "../../../actions";
import "../../../styles/getOrders.scss";
import { devRoleChecker } from "../../../helper";

const GetOrders = () => {
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const func = async () => {
      try {
        const {
          data: { details },
        } = await getMyOrders();
        setOrders(details);
      } catch (err) {
        console.clear();
        setError("No Orders Found");
        const timeId = setTimeout(() => {
          setError(null);
        }, 3200);

        return () => clearTimeout(timeId);
      }
    };

    func();
  }, []);

  const handleOrderUpdate = async (_id) => {
    if (!deliveryStatus) {
      dispatch(showErrorMessage("Select delivery status"));
      const timeid = setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
      return () => clearTimeout(timeid);
    }

    try {
      await updateUserOrder({ _id, delivered: deliveryStatus });
      dispatch(
        showSuccessMessage(`Delivery status update for order id ${_id}`)
      );

      const updateOrder = orders.map((each) => {
        if (each._id === _id) {
          each.delivered = deliveryStatus;
          return each;
        }
        return each;
      });

      setOrders(updateOrder);

      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (err) {
      dispatch(showErrorMessage("Something went wrong"));
      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
    }
  };

  if (error) {
    return <h1 style={{ color: "white" }}>{error}</h1>;
  }

  return (
    <div className='orders-container'>
      <h1>Orders List</h1>
      {orders.map(
        ({
          _id,
          item: { productName, productCoverImage },
          amount,
          createdAt,
          paid,
          delivered,
          address,
          quantity,
          userId: { phoneNumber },
        }) => {
          return (
            <div key={_id} className='get-orders-list'>
              <div className='orders__details-box'>
                <div className='prod-image'>
                  <img src={productCoverImage} alt='prd-cover' />
                </div>
                <div className='prod-order-details'>
                  <p className='prd-name'>Product name : {productName}</p>
                  <p className='prd-price'>Product price : {amount}</p>
                  <p className='prd-price'>Ordered Qty : {quantity}</p>

                  <p className='prd-ordered'>
                    Ordered on :{" "}
                    {new Date(createdAt).toUTCString().split("GMT")[0]}{" "}
                  </p>
                  <p className='prd-paid'>
                    Paid : {paid ? "Paid via card" : "Not paid"}
                  </p>
                  <p className='prd-delivery'>Status : {delivered}</p>
                  <div className='prd-delivery-address'>
                    <p>Name : {address.name}</p>
                    <p> Address :{address.address}</p>
                    <p>City : {address.city}</p>
                    <p>State : {address.state}</p>
                    <p>Postal Code : {address.postalCode}</p>
                    <p>Contact Number : {phoneNumber}</p>
                  </div>
                </div>
                <div className='delivery-status-update'>
                  <select onChange={(ev) => setDeliveryStatus(ev.target.value)}>
                    <option value='pending'>Select delivery status</option>
                    <option value='pending'>Pending</option>
                    <option value='confirmed'>Confirmed</option>
                    <option value='dispatched'>Dispatched</option>
                    <option value='delivered'>Delivered</option>
                  </select>
                  <button onClick={() => handleOrderUpdate(_id)}>
                    Update Status of delivery
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
  })(GetOrders);

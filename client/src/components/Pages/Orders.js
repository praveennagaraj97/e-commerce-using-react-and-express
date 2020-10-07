import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../../styles/orders.scss";

import { getUserOrdersEndpoint } from "../../api";

const Orders = () => {
  const isSigned = useSelector(({ userAccredited: { isSigned } }) => isSigned);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isSigned) {
      (async () => {
        try {
          const {
            data: { details },
          } = await getUserOrdersEndpoint();
          setOrders(details);
        } catch (err) {
          console.clear();
        }
      })();
    }
  }, [isSigned]);

  console.log(orders);

  if (!isSigned) {
    return <h1 style={{ color: "white" }}>Please Login to view Orders</h1>;
  }

  if (orders.length < 1) {
    return <h1 style={{ color: "white" }}>No Orders Found</h1>;
  }

  return <div className='orders-container'>{JSON.stringify(orders)}</div>;
};

export default Orders;

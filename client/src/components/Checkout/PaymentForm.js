import React from "react";

import { CardElement } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  return (
    <>
      <div className='payment-section'>
        <CardElement />
      </div>
    </>
  );
}

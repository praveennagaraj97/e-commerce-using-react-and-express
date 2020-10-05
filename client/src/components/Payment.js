import Axios from "axios";
import React, { useEffect } from "react";

const razorPayScript = (src) =>
  new Promise((resolve, reject) => {
    const scriptTag = document.createElement("script");
    scriptTag.src = src;
    document.body.appendChild(scriptTag);
    scriptTag.onload = () => {
      resolve(true);
    };
    scriptTag.onerror = () => {
      reject("Script load Failed");
    };
  });

const Payment = () => {
  useEffect(() => {
    (async () => {
      const respo = await Axios.post(
        "http://localhost:8080/api/v1/user/payment"
      );
      console.log(respo);
    })();
  }, []);
  const displayRazorPay = async () => {
    const res = await razorPayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (res) {
      var options = {
        key: "rzp_test_kiej2SO1habocZ",
        amount: "50000",
        currency: "INR",
        name: "Lexa",
        description: "Bought Iphone 11 Pro",
        image: "https://pmcvariety.files.wordpress.com/2014/07/the-100.jpg",
        order_id: "1",
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      console.log("failed");
    }
  };

  return (
    <div
      onClick={displayRazorPay}
      style={{ backgroundColor: "white", padding: "3%" }}
      className='payment-container'>
      Payment
    </div>
  );
};

export default Payment;

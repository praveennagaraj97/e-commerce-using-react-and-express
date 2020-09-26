import React, { useState } from "react";
import history from "../../history";

import "../../styles/service.scss";

/**
 * @access Logged User get options to interact with Tech Support
 *          Non-logged User Chat with Bot And get an option to log in !
 */
const Service = () => {
  const [showOrderChat, setShowOrderChat] = useState(false);
  const [showOrderCancel, setShowOrderCancel] = useState(false);

  return (
    <div className='service-page'>
      <div className='service-page__order-related__query service-opt'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/Shopify-Integration.jpg'
          alt='service-order-query-icon'
        />
        <div className='title'>Orders</div>
        <hr />
        <div className='chat-with-us'>
          <button onClick={() => history.push("/service/chat")}>
            Chat with us
          </button>
        </div>
        <div className='related-queries'>
          <p
            onMouseOver={() => setShowOrderChat(true)}
            onMouseLeave={() => setShowOrderChat(false)}>
            Where's my order?
          </p>
          <p
            onMouseOver={() => setShowOrderCancel(true)}
            onMouseLeave={() => setShowOrderCancel(false)}>
            Cancel ordered items!
          </p>
        </div>

        {showOrderChat ? (
          <div className='where-is-order service-solutions'>
            <p>Where's my order?</p>
          </div>
        ) : (
          ""
        )}
        {showOrderCancel ? (
          <div className='cancel-order service-solutions'>
            <p>How to cancel Order</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className='service-page__account-related__query service-opt'>
        <img
          src='https://storage.googleapis.com/lexa-component-styles/maxresdefault.jpg'
          alt='service-account-chat'
        />

        <div className='title'>Accounts</div>
        <hr />
        <div className='chat-with-us'>
          <button onClick={() => history.push("/service/chat")}>
            Chat with us
          </button>
        </div>
        <div className='related-queries'>
          <p
            onMouseOver={() => setShowOrderChat(true)}
            onMouseLeave={() => setShowOrderChat(false)}>
            How to change my password?
          </p>
          <p
            onMouseOver={() => setShowOrderCancel(true)}
            onMouseLeave={() => setShowOrderCancel(false)}>
            Cancel ordered items!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;

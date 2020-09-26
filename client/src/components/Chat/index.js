import React, { Fragment } from "react";

import "../../styles/chat.scss";

const recieved = [
  {
    message:
      "yeah, they do early flights cause they connect with big airports. they wanna get u to your connection",
    at: "51 min",
  },
];

const sent = [
  {
    message:
      "yeah, they do early flights cause they connect with big airports. they wanna get u to your connection",
    at: "51 min",
  },
];

const Chat = () => {
  return (
    <div className='chat-container'>
      <div className='chats'>
        {/* Message container */}
        <ol className='messages__container'>
          {/* Recieved */}
          <li className='recieved'>
            <div className='pointer'></div>
            <div className='messages'>
              {recieved.map(({ message, at }, index) => {
                return (
                  <Fragment key={index}>
                    <p>{message}</p>
                    <time>{at}</time>
                  </Fragment>
                );
              })}
            </div>
          </li>

          {/* Sent */}
          <li className='self'>
            <div className='pointer'></div>
            <div className='messages'>
              {sent.map(({ message, at }, index) => {
                return (
                  <Fragment key={index}>
                    <p>{message}</p>
                    <time>{at}</time>
                  </Fragment>
                );
              })}
            </div>
          </li>
        </ol>
      </div>

      {/* Char Input */}
      <div className='chat-input'>
        <input type='text' placeholder='type your message' />
        <img
          src='https://img.icons8.com/fluent/144/000000/filled-sent.png'
          alt='send'
        />
      </div>
    </div>
  );
};

export default Chat;

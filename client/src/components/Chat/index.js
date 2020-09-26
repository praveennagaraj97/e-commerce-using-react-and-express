import React, { useState } from "react";

import "../../styles/chat.scss";

const Chat = () => {
  const [sentMessage, setSentMessage] = useState("");

  const [sent, setSent] = useState([
    {
      message:
        "yeah, they do early flights cause they connect with big airports. they wanna get u to your connection",
      at: "51 min",
    },
  ]);

  const [recieved, setRecieved] = useState([
    {
      message:
        "yeah, they do early flights cause they connect with big airports. they wanna get u to your connection",
      at: "51 min",
    },
  ]);

  return (
    <div className='chat-container'>
      <div className='chats'>
        {/* Message container */}
        <ol className='messages__container'>
          {/* Recieved */}
          {recieved.map(({ message, at }, index) => {
            return (
              <li className='recieved' key={index}>
                <div className='pointer'></div>
                <div className='messages'>
                  <p>{message}</p>
                  <time>{at}</time>
                </div>
              </li>
            );
          })}

          {/* Sent */}
          {sent.map(({ message, at }, index) => {
            return (
              <li key={index} className='self'>
                <div className='pointer'></div>
                <div className='messages'>
                  <p>{message}</p>
                  <time>{at}</time>
                </div>
              </li>
            );
          })}
        </ol>
        {/* Char Input */}
        <div className='chat-input'>
          <input
            type='text'
            onChange={(ev) => setSentMessage(ev.target.value)}
            value={sentMessage}
            placeholder='type your message'
          />
          <img
            onClick={() => {
              setSent([...sent, { message: sentMessage, at: "now" }]);
              setSentMessage("");
            }}
            src='https://img.icons8.com/fluent/144/000000/filled-sent.png'
            alt='send'
          />
        </div>
      </div>
      <button
        onClick={() => {
          setRecieved([...recieved, { message: sentMessage, at: "now" }]);
          setSentMessage("");
        }}>
        Temp recieve
      </button>
    </div>
  );
};

export default Chat;

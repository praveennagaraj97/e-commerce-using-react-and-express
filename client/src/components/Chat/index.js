import React from "react";

import "../../styles/chat.scss";

const Chat = () => {
  return (
    <div className='section-service-chat'>
      <div className='chat-container'>
        <div className='chats'>
          {/* Message container */}
          <div className='messages__container'></div>

          {/* Char Input */}
          <div className='chat-input'>
            <input type='text' placeholder='type your message' />
            <img
              onClick={() => {}}
              src='https://img.icons8.com/fluent/144/000000/filled-sent.png'
              alt='send'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

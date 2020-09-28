import { useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { MESSAGE_SUBSCRIPTION, SEND_MESSAGE } from "../../graphql";

import "../../styles/chat.scss";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector(({ userAccredited }) => userAccredited);

  const [handleMessage] = useMutation(SEND_MESSAGE);

  const { loading, error, data } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { userId: user.user },
  });

  if (loading) return <h1 style={{ color: "white" }}>Loading...</h1>;

  if (error)
    return (
      <h1 style={{ color: "white" }}>
        {error.message || "Something went wrong"}
      </h1>
    );

  return (
    <div className='section-service-chat'>
      <div className='chat-container'>
        <div className='chats'>
          {/* Message container */}
          <ol className='messages__container'>
            {data.messenger.chats.map(({ _id, from, message }) => {
              if (from !== user.user) {
                return (
                  <li className='recieved' key={_id}>
                    <div className='messages'>
                      <p>{message}</p>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={_id} className='self'>
                    <div className='messages'>
                      <p>{message}</p>
                    </div>
                  </li>
                );
              }
            })}
          </ol>

          {/* Char Input */}
          <div className='chat-input'>
            <input
              type='text'
              placeholder='type your message'
              onChange={(ev) => setNewMessage(ev.target.value)}
            />
            <img
              onClick={() =>
                handleMessage({
                  variables: { message: newMessage },
                })
              }
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

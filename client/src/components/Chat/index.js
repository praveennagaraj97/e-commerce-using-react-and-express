import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";

import { GET_CHAT_HISTORY } from "../../graphql";

import "../../styles/chat.scss";

const Chat = () => {
  const { loading, error, data } = useQuery(GET_CHAT_HISTORY, {
    variables: { withWhom: "5f70720142afdd4c8c5c09e5" },
  });
  const user = useSelector(({ userAccredited }) => userAccredited);

  if (loading) return <h1 style={{ color: "white" }}>Loading...</h1>;

  if (error)
    return (
      <h1 style={{ color: "white" }}>
        {error.message || "Something went wrong"}
      </h1>
    );

  const {
    getMyChats: { chats },
  } = data;

  return (
    <div className='section-service-chat'>
      <div className='chat-container'>
        <div className='chats'>
          {/* Message container */}
          <ol className='messages__container'>
            {chats.map(({ _id, from, message }) => {
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

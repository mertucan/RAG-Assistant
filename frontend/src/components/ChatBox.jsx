import React from 'react';
import Message from './Message';

const ChatBox = ({ messages, chatBoxRef }) => {
  return (
    <div className="chat-box" ref={chatBoxRef}>
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}
    </div>
  );
};

export default ChatBox;

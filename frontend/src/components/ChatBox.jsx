import React from 'react';
import Message from './Message';

const ChatBox = ({ messages, chatBoxRef, isTyping }) => {
  return (
    <div className="chat-box" ref={chatBoxRef}>
      {messages.map((msg, index) => (
        <Message key={index} msg={msg} />
      ))}
      {isTyping && (
        <div className="message-wrapper bot">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
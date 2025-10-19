import React from 'react';

const Message = ({ msg }) => {
  return (
    <div className={`message-wrapper ${msg.sender}`}>
      <div className="message">
        {msg.text}
      </div>
    </div>
  );
};

export default Message;

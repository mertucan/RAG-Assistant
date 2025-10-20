import React, { useState } from 'react';

const MessageInput = ({ input, setInput, sendMessage }) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        maxLength={500}
      />
      <button 
        onClick={sendMessage}
        disabled={!input.trim()}
        style={{
          opacity: input.trim() ? 1 : 0.6,
          cursor: input.trim() ? 'pointer' : 'not-allowed'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
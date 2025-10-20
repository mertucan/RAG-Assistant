import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

import ChatHeader from './components/ChatHeader';
import ChatBox from './components/ChatBox';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', {
        message: input,
      });
      
      // Simulate typing delay
      setTimeout(() => {
        const botMessage = { sender: 'bot', text: response.data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <ChatBox messages={messages} chatBoxRef={chatBoxRef} isTyping={isTyping} />
      <MessageInput 
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;
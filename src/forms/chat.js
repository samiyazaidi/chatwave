// src/Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to WebSocket server

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // When connected, listen for events
    socket.on('you-have-connected', (data) => {
      console.log(data.message);
    });

    socket.on('message', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, `${data.sender}: ${data.content}`]);
    });

    socket.on('user-joined', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data.message]);
    });

    socket.on('user-left', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('you-have-connected');
      socket.off('message');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, []);

  const handleSendMessage = () => {
    if (username && message) {
      socket.emit('events', { username, content: message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h2>Chat Messages:</h2>
        {chatMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default Chat;

import './App.css';
import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './forms/signin';
import Profile from './forms/Profile';
import Signup from './forms/signup';
import Chat from './forms/chat';

function App() {
  return (
    <div>
  <Router>
        <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
    </div>
  );
}


export default App;

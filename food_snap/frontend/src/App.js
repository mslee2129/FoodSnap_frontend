import React from 'react';
import logo from './logo_512.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to FoodSnap!
        </p>
        <a
          className="App-link"
          href="https://chat.openai.com/chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about us
        </a>
      </header>
    </div>
  );
}

export default App;

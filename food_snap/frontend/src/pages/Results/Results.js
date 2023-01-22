import React, { useState } from 'react';
import logo from '../../resources/logo_512.png';
import './Results.css';

function Results() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Results
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default Results;

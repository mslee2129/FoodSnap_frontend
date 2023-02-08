import React from 'react'
import './Loading.css'
import logo from '../../resources/loading.png'

function Loading () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please wait...
        </p>
      </header>
    </div>

  )
}

export default Loading

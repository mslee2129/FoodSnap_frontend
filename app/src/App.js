import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'
import "./styles.css"

function App () {
  return (
      <div className="App bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] min-h-screen min-w-screen">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </div>
  )
}

export default App

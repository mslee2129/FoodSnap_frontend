import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'
import Loading from './pages/Loading/Loading'

function App () {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/loading" element={<Loading/>} />
      </Routes>
    </div>
  )
}

export default App

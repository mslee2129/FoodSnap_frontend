import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </div>
  )
}

export default App



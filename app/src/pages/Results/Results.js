import React from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'

function Results () {

  const location = useLocation()
  const navigate = useNavigate()
  if (location.state.responseData) {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Results</h1>
            <h5>Type of food:&nbsp;{location.state.responseData.label}</h5>
            <h5>Weight: {location.state.responseData.weight} grams</h5>
            <h5>Nutritional value</h5>
            <div>
              <p>Calories: {location.state.responseData.nutrition.ENERC_KCAL} KCal</p>
              <p>Fat: {location.state.responseData.nutrition.FAT} grams</p>
              <p>Protein: {location.state.responseData.nutrition.PROCNT} grams</p>
            </div>
              <button onClick={() => navigate('/')}>Try Again</button>
          </header>
        </div>
    )
  } else {
    return (
        <div className="App">
          <header className="App-header">
            <h1>No Result Available</h1>
            <button onClick={() => navigate('/')}>Try Again</button>
          </header>
        </div>
    )
  }
}

export default Results

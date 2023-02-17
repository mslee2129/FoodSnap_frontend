import React from 'react'
import './Results.css'
import { useLocation } from 'react-router-dom'
import Navigation from '../../elements/Navigation/Navigation'

function Results () {

  const location = useLocation()

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Results
        </h1>
        <h5>
          Type of food:&nbsp;
          {location.state.responseData.label}
        </h5>
        <h5>
          Weight: {location.state.responseData.weight}
        </h5>
        <h5>
          Nutritional value
        </h5>
        <div>
          <p>Calories: {location.state.responseData.nutrition.ENERC_KCAL}</p>
          <p>Fat: {location.state.responseData.nutrition.FAT}</p>
          <p>Protein: {location.state.responseData.nutrition.PROCNT}</p>
        </div>
      </header>
      <Navigation />
    </div>
  )
}

export default Results

import React, {useEffect, useState} from 'react'
import './Results.css'
import { useLocation, useNavigate } from 'react-router-dom'

function Results () {

    const location = useLocation()
    const navigate = useNavigate()
    const [tableData, setTableData] = useState()

    useEffect(() => {
        console.log('location state:', location.state)
        if (location.state && location.state.responseData) {
            console.log('response data:', location.state.responseData)
            setTableData(location.state.responseData)
        } else {
            setTableData(null)
        }
    }, [location.state])

    if (!tableData) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>No Result Available</h1>
                    <button onClick={() => navigate('/')}>Try Again</button>
                </header>
            </div>
        )
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Results</h1>
                <table>
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Weight</th>
                    <th>Calories</th>
                    <th>Carbohydrates</th>
                    <th>Protein</th>
                    <th>Fat</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(tableData) && tableData.map((result, index) => (
                <tr key={index}>
                    <td>{result.label}</td>
                    <td>{result.weight} g</td>
                    <td>{result.nutrition ? result.nutrition.ENERC_KCAL : ''} KCal</td>
                    <td>{result.nutrition ? result.nutrition.CHOCDF : ''} g</td>
                    <td>{result.nutrition ? result.nutrition.PROCNT : ''} g</td>
                    <td>{result.nutrition ? result.nutrition.FAT : ''} g</td>
                </tr>
            ))}
            </tbody>
          </table>
          <button onClick={() => navigate('/')}>Try Again</button>
      </header>
    </div>
    )

}

export default Results

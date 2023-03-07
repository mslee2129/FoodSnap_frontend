import React, {useEffect, useState} from 'react'
import './Results.css'
import '../../elements/Button/Button.css'
import { useLocation, useNavigate } from 'react-router-dom'

function Results () {

    const location = useLocation()
    const navigate = useNavigate()
    const [tableData, setTableData] = useState()

    const model_codes = {
        "YOLO_USE_PLATE_SIZE" : "We've identified your food! 🎉",
        "YOLO_USE_IMAGE_SIZE" : "We've identified your food! 🎉" +
            "\ndid you know we can give more accurate results if the food is on a plate? 🍽",
        "VISION_DEFAULT" : "We're working hard to add more dishes to our system! 🔧" +
            "\nbut here are nutritional values for a 100g serving 😋",
        "NO_FOOD_DETECTED" : "We didn't detect any food 😢 please try again!"
    }

    useEffect(() => {
        console.log('location state:', location.state)
        if (location.state && location.state.responseData) {
            console.log('response data:', location.state.responseData)
            setTableData(location.state.responseData.results)
        } else {
            setTableData(null)
        }
    }, [location.state])

    if (!tableData) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>No Result Available</h1>
                    <button className='Button' onClick={() => navigate('/')}>Try Again</button>
                </header>
            </div>
        )
    }
    return (
        <pre>
        <div className="App">
            <header className="App-header">
                <h1>Results</h1>
                <h4>{model_codes[location.state.responseData.model_code]}</h4>
                {Array.isArray(tableData) && tableData.map((result, index) => (
                <table key = {index}>
                    <caption>{result.label}</caption>
                    {/* <tr>
                        <th>Label</th>
                        <th>{result.label}</th>
                    </tr> */}
                    <tr>
                        <td>Weight</td>
                        <td>{result.weight} g</td>
                    </tr>
                    <tr>
                        <td>Calories</td>
                        <td>{result.nutrition ? result.nutrition.ENERC_KCAL : ''} KCal</td>
                    </tr>
                    <tr>
                        <td>Carbohydrates</td>
                        <td>{result.nutrition ? result.nutrition.CHOCDF : ''} g</td>
                    </tr>
                    <tr>
                        <td>Protein</td>
                        <td>{result.nutrition ? result.nutrition.PROCNT : ''} g</td>
                    </tr>
                    <tr>
                        <td>Fat</td>
                        <td>{result.nutrition ? result.nutrition.FAT : ''} g</td>
                    </tr>
                    
                </table>
                
            ))}
          <button className='Button' onClick={() => navigate('/')}>Try Again</button>
      </header>
    </div>
    </pre>
    )

}

export default Results

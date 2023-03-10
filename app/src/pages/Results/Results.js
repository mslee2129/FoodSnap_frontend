import React, {useEffect, useState} from 'react'
import './Results.css'
// import '../../elements/Button/Button.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Drawer from '../../elements/Drawer'

function Results () {

    const location = useLocation()
    const navigate = useNavigate()
    const [tableData, setTableData] = useState()
    const [isOpen, setIsOpen] = useState(false);

    const model_codes = {
        "YOLO_USE_PLATE_SIZE" : "We've identified your food! 🎉",
        "YOLO_USE_IMAGE_SIZE" : "We've identified your food! 🎉" +
            "\nDid you know we can give more accurate results if the food is on a plate? 🍽",
        "VISION_DEFAULT" : "We're working hard to add more dishes to our system! 🔧" +
            "\nBut here are nutritional values for a 100g serving 😋",
        "NO_FOOD_DETECTED" : "We failed to identify a food item in your picture. 😢 Please make sure that the picture includes a food item, and that the picture is taken from above. Please try again!"
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
            <div className="flex-auto items-center justify-center bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] min-h-screen min-w-screen overflow-x-hidden overflow-y-auto overscroll-none App">
            <header className="flex flex-col min-h-screen min-w-screen flex-grow font-sans mt-5 text-align App-header bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] overflow-x-hidden overscroll-none min-w-screen min-h-screen">
            <style>
                @import url(https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Tilt+Warp&display=swap);
            </style>
                <button className="fixed items-center justify-center top-1 right-0 z-10 text-[color:var(--sidebar-button-light)] dark:text-[color:var(--sidebar-button-dark)] bg-transparent rounded-lg text-sm px-5 py-5 mr-2 mb-2" type="button" onClick={() => setIsOpen(true)}>
                    <svg className="w-7 h-7" fill="currentColor" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                </Drawer>
                <div className="h-screen flex flex-col absolute inset-0 align-middle place-items-center justify-center items-center">
                    <div className="flex -mt-20 place-items-center align-middle text-center text-3xl flex-col justify-center items-center text-[color:var(--h1-light)] dark:text-[color:var(--h1-dark)]">
                        <h1 className="flex justify-center text-center text-4xl">No Results Found</h1>
                        <p className="flex mt-10 mx-5 font-sans text-xl">We failed to identify a food item in your picture. Please make sure that the picture includes a food item, and that the picture is taken from above.</p>
                    </div>
                    <div className ="justify-center">
                        <button
                            className="mt-10 p-0.5 text-l font-medium text-[color:var(--button-text-light)] dark:text-[color:var(--button-text-dark)] rounded-lg group group-hover:from-pink-500 group-hover:to-orange-400 hover:text-[color:var(--button-text-light)] hover:dark:text-[color:var(--button-text-dark)]  transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={() => navigate('/')}>
                            <span
                                className="px-8 font-bold text-lg py-2.5 transition-all ease-in duration-75 bg-[color:var(--button-background-light)] dark:bg-[color:var(--button-background-dark)] rounded-md group-hover:bg-opacity-0">
                                Try Again
                            </span>
                        </button>
                    </div>
                </div>
                
        </header>
        </div>
        )
    }
    return (
        <div className="flex-auto items-center justify-center bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] min-h-screen min-w-screen overflow-x-hidden overflow-y-auto overscroll-none App">
            <header className="flex flex-col min-h-screen min-w-screen flex-grow font-sans mt-5 text-align App-header bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] overflow-x-hidden overscroll-none min-w-screen min-h-screen">
            <style>
                @import url(https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Tilt+Warp&display=swap);
            </style>
                <button className="fixed items-center justify-center top-1 right-0 z-10 text-[color:var(--sidebar-button-light)] dark:text-[color:var(--sidebar-button-dark)] bg-transparent rounded-lg text-sm px-5 py-5 mr-2 mb-2" type="button" onClick={() => setIsOpen(true)}>
                    <svg className="w-7 h-7" fill="currentColor" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                </Drawer>
                <div className="text-center text-4xl flex-col justify-center items-center text-[color:var(--h1-light)] dark:text-[color:var(--h1-dark)]">
                    <h1>Results</h1>
                </div>
                <h4 className="content-center px-10 text-m relative text-[color:var(--p-light)] dark:text-[color:var(--p-dark)] py-5">{model_codes[location.state.responseData.model_code]}</h4>
                {Array.isArray(tableData) && tableData.map((result, index) => (
                    <div key={index} className="border-solid relative overflow-x-auto">
                    <table  className="mx-auto border-solid w-80 text-sm text-left text-[color:var(--table-results-txt-light)] dark:text-[color:var(--table-results-txt-dark)]">
                        {/* <caption>{result.label}</caption> */}
                        <thead className="border-solid text-xs text-[color:var(--table-h-txt-light)] uppercase bg-[color:var(--table-h-bg-light)] dark:bg-[color:var(--table-h-bg-dark)] dark:text-[color:var(--table-h-txt-dark)]">
                            <tr>
                                <th scope="col" className="header-font px-6 py-3" colSpan={2}>
                                    {result.label}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-[color:var(--table-b-bg-light)] border-b dark:bg-[color:var(--table-b-bg-dark)] dark:border-gray-700 hover:bg-[color:var(--table-b-bg-light-hover)] dark:hover:bg-[color:var(--table-b-bg-dark-hover)]">
                                <th scope="row" className="px-6 py-4 font-medium text-[color:var(--table-b-txt-light)] whitespace-nowrap dark:text-[color:var(--table-b-txt-dark)]">Weight</th>
                                <td>{result.nutrition ? result.weight : ''} g</td>
                            </tr>
                        <tr className="bg-[color:var(--table-b-bg-light)] border-b dark:bg-[color:var(--table-b-bg-dark)] dark:border-gray-700 hover:bg-[color:var(--table-b-bg-light-hover)] dark:hover:bg-[color:var(--table-b-bg-dark-hover)]">
                                <th scope="row" className="px-6 py-4 font-medium text-[color:var(--table-b-txt-light)] whitespace-nowrap dark:text-[color:var(--table-b-txt-dark)]">Calories</th>
                                <td>{result.nutrition ? result.nutrition.ENERC_KCAL : ''} KCal</td>
                            </tr>
                            <tr className="bg-[color:var(--table-b-bg-light)] border-b dark:bg-[color:var(--table-b-bg-dark)] dark:border-gray-700 hover:bg-[color:var(--table-b-bg-light-hover)] dark:hover:bg-[color:var(--table-b-bg-dark-hover)]">
                                <th scope="row" className="px-6 py-4 font-medium text-[color:var(--table-b-txt-light)] whitespace-nowrap dark:text-[color:var(--table-b-txt-dark)]">Carbohydrates</th>
                                <td>{result.nutrition ? result.nutrition.CHOCDF : ''} g</td>
                            </tr>
                            <tr className="bg-[color:var(--table-b-bg-light)] border-b dark:bg-[color:var(--table-b-bg-dark)] dark:border-gray-700 hover:bg-[color:var(--table-b-bg-light-hover)] dark:hover:bg-[color:var(--table-b-bg-dark-hover)]">
                                <th scope="row" className="px-6 py-4 font-medium text-[color:var(--table-b-txt-light)] whitespace-nowrap dark:text-[color:var(--table-b-txt-dark)]">Protein</th>
                                <td>{result.nutrition ? result.nutrition.PROCNT : ''} g</td>
                            </tr>
                            <tr className="bg-[color:var(--table-b-bg-light)] border-b dark:bg-[color:var(--table-b-bg-dark)] dark:border-gray-700 hover:bg-[color:var(--table-b-bg-light-hover)] dark:hover:bg-[color:var(--table-b-bg-dark-hover)]">
                                <th scope="row" className="px-6 py-4 font-medium text-[color:var(--table-b-txt-light)] whitespace-nowrap dark:text-[color:var(--table-b-txt-dark)]">Fat</th>
                                <td>{result.nutrition ? result.nutrition.FAT : ''} g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
          <div className ="text-center mb-8">
                <button
                    className="relative inline-flex items-center justify-center p-0.5  mb-2 mr-2 text-l font-medium text-[color:var(--button-text-light)] dark:text-[color:var(--button-text-dark)] rounded-lg group group-hover:from-pink-500 group-hover:to-orange-400 hover:text-[color:var(--button-text-light)] hover:dark:text-[color:var(--button-text-dark)]  transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95" onClick={() => navigate('/')}>
                      <span
                          className="relative px-8 font-bold text-lg py-2.5 transition-all ease-in duration-75 bg-[color:var(--button-background-light)] dark:bg-[color:var(--button-background-dark)] rounded-md group-hover:bg-opacity-0">
                          Try Again
                      </span>
                </button>
            </div>
      </header>
    </div>)

}

export default Results

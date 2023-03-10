import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/new_logo/Logo.svg'
import { config } from '../../Constants'
import './Home.css'
import './Loading.css'
import axios from 'axios'
import "../../styles.css"
import Drawer from '../../elements/Drawer' // needed for drawer

function Home() {
  // setFile is function used to update the file variable
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [isValidInput, setIsValidInput] = useState(true);
  const [plateValue, setPlateValue] = useState();
  const [responseData, setResponseData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // needed for drawer


  // set URL for back-end depending on if running in dev or prod
  var url = config.url.API_URL;

  // handleChange is called when a file is uploaded, and uses the event as an argument to call setFile
  function handleUpload(event) {
    setFile(event.target.files[0])
  }

  function handlePlateValueChange(event) {
    const value = parseFloat(event.target.value);
    if (value < 10 || value > 40) {
      setIsValidInput(false);
      setPlateValue()
    } else {
      setIsValidInput(true);
      setPlateValue(value);
    }
  }

  function handleSubmit(event) {
    // prevents default event behaviour (auto refresh)
    event.preventDefault()

    // handle case where file state is not set
    if (!file) {
      return;
    }
    // creates variables for HTTP request
    // url needs to be changed to our backend server
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('plateValue', plateValue);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // sends HTTP POST request
    setIsLoading(true)
    axios.post(url, formData, config)
        .then((response) => {
          console.log(response.data)
          const res = response.data
          if (res.status) {
            const responseData = {
              model_code: res.model_code,
              status: res.status,
              results: res.results.map((result) => ({
                label: result.label,
                nutrition: result.nutrition,
                weight: result.weight,
              })),
            };
            setResponseData(responseData)
          }
        })
        .catch((error) => {
          console.log(error.data);
          setResponseData({})
          navigate('/results', {state: {responseData}})
        })
        // change loading state to false before moving
        .finally(() => setIsLoading(false));
  }

  /*forward to results page once data is received*/
  useEffect(() => {
    if (responseData) {
      console.log("response data", responseData)
      navigate('/results', {state:{responseData}})
    }
  }, [responseData]);


  return (
    <div className="Home flex-auto bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] items-center justify-center min-h-screen min-w-screen overflow-x-hidden overflow-y-auto">
      <header className="bg-[color:var(--bg-light)] dark:bg-[color:var(--bg-dark)] flex flex-col flex-grow min-h-screen min-w-screen Home-header">
        <style>
          @import url(https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Tilt+Warp&display=swap);
        </style>
        {isLoading && (<div className="Loading">
              <div role="status">
                <svg aria-hidden="true"
                     className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"/>
                  <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading-icon</span>
            </div>
        </div>
        )}

        {/* Start of drawer */}
        <button className="fixed items-center justify-center top-1 right-0 z-10 text-[color:var(--sidebar-button-light)] dark:text-[color:var(--sidebar-button-dark)] bg-transparent rounded-lg text-sm px-5 py-5 mr-2 mb-2" type="button" onClick={() => setIsOpen(true)}>
          <svg className="w-7 h-7" fill="currentColor" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        </Drawer>
        {/* End of Drawer */}

        {/*Header text*/}
        <div className="flex-col justify-center items-center min-h-screen px-8 lg:px-64 -mt-5">
          <div className="mt-5 -mb-12 flex-none">
            <img src={logo} alt="FoodSnap logo" className="h-auto max-w-full scale-50" />
          </div>
          <div className=" flex-col flex justify-center items-center w-full">
            <div>
              <h1 className="-mt-5 ml-12 flex items-center text-center mb-4 text-6xl font-normal leading-none tracking-tight text-gray-900 dark:text-white">
                <span className = "flex-row text-center text-transparent bg-clip-text bg-opacity-50 bg-gradient-to-r from-[color:var(--header-gradient-first-light)] to-[color:var(--header-gradient-last-light)] dark:from-[color:var(--header-gradient-first-dark)] dark:to-[color:var(--header-gradient-last-dark)]"> FoodSnap.</span> <span
                  className="font-sans mb-6 flex-inline bg-[color:var(--badge-bg-light)] dark:bg-[color:var(--badge-bg-dark)] text-[color:var(--badge-text-light)] dark:text-[color:var(--badge-text-dark)]  text-xs font-semibold -ml-3 mr-2 px-2.5 py-0.5 rounded">ALPHA</span>
              </h1>
              <p className="mb-4 text-center text-l font-bold text-[color:var(--h1-light)] dark:text-[color:var(--h1-dark)]">Smart<span
                  className="text-transparent bg-clip-text bg-opacity-50 bg-gradient-to-r from-[color:var(--gradient-first-light)] to-[color:var(--gradient-last-light)] dark:from-[color:var(--gradient-first-dark)] dark:to-[color:var(--gradient-last-dark)] "> AI-powered</span> calorie estimation</p>
              <p className="mb-6 text-sm font-normal text-center text-[color:var(--p-light)] dark:text-[color:var(--p-dark)] lg:text-xl sm:px-16 xl:px-48">
              </p>
            </div>
          </div>
          {/* End of Header text */}

          {/*Plate input*/}
          <div className = "flex flex-col justify-center items-center block">
          <form onSubmit={handleSubmit} data-testid="upload-form" className="flex flex-col justify-center items-center mt-4">
            <div className="w-full justify-center text-left">
              <label htmlFor="plate-value" className="justify-left block mb-2 text-sm font-medium text-[color:var(--label-txt-light)] dark:text-[color:var(--label-txt-dark)]">
                Enter your plate diameter:
              </label>
              <div className="flex items-center">
                <input
                    type="number"
                    step="0.5"
                    min="10"
                    max="40"
                    id="plate-value"
                    className={`${
                        isValidInput
                            ? 'focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500 w-full block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                            : 'focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:border-red-600 w-full bg-red-50 border border-red-500 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500'
                    } text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-green-500`}
                    placeholder="Default: 25cm"
                    value={plateValue}
                    onChange={handlePlateValueChange}
                />
                <div className="dark:text-white group pl-2 relative flex w-max">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                       stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
                  </svg>
                  <span className="w-max group-hover:scale-100 absolute z-10 invisible bg-[color:var(--tooltip-background-light)] dark:bg-[color:var(--tooltip-background-dark)] text-[color:var(--tooltip-text-light)] dark:text-[color:var(--tooltip-text-dark)] text-xs font-medium rounded-lg shadow-sm tooltip p-2.5 -mt-8 -top-5 right-0">
                    Please enter a value between 10 and 40 cm
                  </span>
                  {!isValidInput && (
                      <span className="w-max group-hover:scale-100 absolute z-10 visible bg-[color:var(--tooltip-background-light)] dark:bg-[color:var(--tooltip-background-dark)] text-[color:var(--tooltip-text-light)] dark:text-[color:var(--tooltip-text-dark)] text-xs font-medium rounded-lg shadow-sm tooltip p-2.5 -mt-8 -top-5 right-0">
                        Please enter a value between 10 and 40 cm
                      </span>
                  )}
                </div>
              </div>
              {/*End of plate input*/}

              {/*Select file*/}
              <div className="flex justify-center text-left w-full mb-4">
                <div className= "justify-center text-left">
                  <label htmlFor="file_input" className="justify-left block mt-5 mb-2 text-sm font-medium text-[color:var(--label-txt-light)] dark:text-[color:var(--label-txt-dark)]">Upload your photo here:</label>
                  <div className = "flex justify-center w-full h-10 mb-6" >
                    <input
                        className="appearance-none transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 block w-full h-10 text-sm text-gray-900 border border-dark rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input" type="file" accept=".png,.jpeg,.jpg" onChange={handleUpload} />
                  </div>
                </div>
              </div>
            </div>
            {/*End of select file*/}

            {/* Estimate button */}
              <div className ="text-center ">
                <button
                    className="relative inline-flex items-center justify-center p-0.5  mb-2 mr-2 text-l font-medium text-[color:var(--button-text-light)] dark:text-[color:var(--button-text-dark)] rounded-lg group group-hover:from-pink-500 group-hover:to-orange-400 hover:text-[color:var(--button-text-light)] hover:dark:text-[color:var(--button-text-dark)]  transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                      <span
                          className="relative px-8 font-bold text-lg py-2.5 transition-all ease-in duration-75 bg-[color:var(--button-background-light)] dark:bg-[color:var(--button-background-dark)] rounded-md group-hover:bg-opacity-0">
                          Estimate!
                      </span>
                </button>
              </div>
            {/* end of estimate button */}

          </form>
        </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/food_love.png'
import { config } from '../../Constants'
import './Home.css'
import './Loading.css'
import Hover from '../../elements/Hover/Hover'
import axios from 'axios'
import Button from "../../components/Button";

function Home() {
  // setFile is function used to update the file variable
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [isValidInput, setIsValidInput] = useState(true);
  const [plateValue, setPlateValue] = useState();
  const [responseData, setResponseData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [showHoveringPage, setShowHoveringPage] = useState(false);

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


  function toggleHoveringPage() {
    setShowHoveringPage(!showHoveringPage);
  }

  return (
    <div className="Home bg-gray-800 flex flex-col items-center justify-center flex-grow min-h-screen">
      <header className="bg-gray-800 flex flex-col flex-grow min-h-screen Home-header">
        {showHoveringPage && <Hover />}
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
        <Button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" onClick={toggleHoveringPage}>
          About
        </Button>
        <div className="flex flex-col justify-center items-start min-h-screen px-8 lg:px-64 dark:bg-gray-800">
          <div className="flex justify-start items-center w-full">
            <div className="mr-4">
              <img src={logo} alt="FoodSnap logo" className="h-auto max-w-full" />
            </div>
            <div>
              <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Welcome to <span className = "text-blue-600 dark:text-blue-500"> FoodSnap!</span> <span
                  className="bg-blue-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 top-0 rounded dark:bg-blue-200 dark:text-blue-800">ALPHA</span>
              </h1>
              <p className="mb-6 text-sm font-normal text-justify text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Imagine that you could show a dish to an app and it would come back to you with the number of calories that it contained?
              </p>
            </div>
          </div>
          <div className = "inline-flex justify-center items-center block">
          <form onSubmit={handleSubmit} data-testid="upload-form" className="flex flex-col justify-center items-center mt-4">
            <div className="flex justify-between w-full mb-4">
              <div className= "justify-center text-left">
                <label htmlFor="file_input" className="justify-left block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Upload your photo here:</label>
              <div className = "flex justify-center w-full h-10 mb-6" >
              <input
                  className="block w-full h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input" type="file" accept=".png,.jpeg,.jpg" onChange={handleUpload} />
              </div>
            </div>
            </div>
            <div className= "justify-center text-left">
                <label htmlFor="plate-value" className="justify-left block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">Enter your plate diameter:</label>
            <div className = "flex justify-center w-full h-10 mb-6 space-x-4" >
            <input
                    type="number"
                    step="0.5"
                    min="10"
                    max="40"
                    id="plate-value"
                    className={`${
                        isValidInput ? 'focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:border-green-500 w-full block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">' 
                            : 'focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:border-red-600 w-full bg-red-50 border border-red-500 text-red-900 placeholder-red-700 dark:text-red-500 dark:placeholder-red-500'
                    } text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-green-500`}
                    placeholder="Default: 25cm"
                    value={plateValue}
                    onChange={handlePlateValueChange}
                />
                <div className = "w-auto h-auto">
                {isValidInput ? (
                    <p className=" text-sm text-gray-900 dark:text-gray-400">
                      <span className="font-medium">Please enter a number between 10 and 40!</span>
                    </p>
                ) : (
                    <p className="text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Please enter a number between 10 and 40!</span>
                    </p>
                )}
              </div>
              </div>
              <div className ="text-center">
                <Button gradientDuoTone={"tealToLime"}>Upload</Button>
              </div>
            </div>
          </form>
        </div>
        </div>
      </header>
    </div>
  );
}

export default Home;

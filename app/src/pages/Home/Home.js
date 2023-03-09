import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/food_love.png'
import { config } from '../../Constants'
import './Home.css'
import './Loading.css'
// import Hover from '../../elements/Hover/Hover'
import Drawer from './Drawer' // needed for drawer
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


  // function toggleHoveringPage() {
  //   setShowHoveringPage(!showHoveringPage);
  // }



  return (
    
    <div className="Home bg-gray-800 flex flex-col items-center justify-center flex-grow min-h-screen">
      <header className="bg-gray-800 flex flex-col flex-grow min-h-screen Home-header">
        {/* {showHoveringPage && <Hover />} */}

        {isLoading && 
        (<div className="Loading">
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
        
        <div className="flex flex-col justify-center items-start min-h-screen px-8 lg:px-64 dark:bg-gray-800">

        {/* Start of drawer */}
        <button className="fixed items-center justify-center top-1 right-0 z-10 text-white bg-transparent rounded-lg text-sm px-5 py-5 mr-2 mb-2" type="button" onClick={() => setIsOpen(true)}>
          <svg className="w-7 h-7" fill="currentColor" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <p>FoodSnap is a progressive web app that allows you to upload/take a
                picture of a food item to estimate its nutritional value. To get
                started, upload a picture of your food. For more accurate results,
                make sure you have the food item on a plate. There is also an option
                to enter the plate size below.</p>
        </Drawer>
        {/* End of Drawer */}


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
     {/* <div id="drawer-example" className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-label">
          <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>Info</h5>
            <button type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" className="text-blue-600 underline dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></a>
          </div>
        </div> */}
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/food_love.png'
import { config } from '../../Constants'
//import { Results } from '../Results/Results'
import './Home.css'
import './Loading.css'
import '../../elements/Button/Button.css'
import Hover from '../../elements/Hover/Hover'
// needs to installed
import axios from 'axios'

function Home() {
  // setFile is function used to update the file variable
  const navigate = useNavigate()
  const [file, setFile] = useState()
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
    <div className="Home">
      <header className="Home-header">
        {showHoveringPage && <Hover />}
        {isLoading && (<div className="Loading">
          <div className='Loading-icon'></div>
        </div>
        )}
        <button className="Button" onClick={toggleHoveringPage}>
          About
        </button>
        <h1>
          Welcome to FoodSnap!
        </h1>
        <img src={logo} className="Home-logo" alt="logo" />
        {/* upload picture functionality */}
        <form onSubmit={handleSubmit} data-testid="upload-form">
          <p>To start upload a picture (.png/.jpeg/.jpg) to get your calorie information!</p>
          {/* restricts file type to png, jpeg, jpg from upload window and calls upload event handler */}
          <input type="file" accept=".png,.jpeg,.jpg" onChange={handleUpload}/>
          <input type="number" step="0.5" min="10" max="40" placeholder="Plate diameter (default: 25cm) " size="32"
                 onChange={(event) => setPlateValue(parseFloat(event.target.value))} />
          <div>
            <button className = 'Button' type="submit">Upload</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Home;

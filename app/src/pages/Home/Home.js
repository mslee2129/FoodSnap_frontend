import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/food_love.png'
import Navigation from '../../elements/Navigation/Navigation'
import { config } from '../../Constants'
import './Home.css'
import Hover from '../../elements/Hover/Hover'
// needs to installed
import axios from 'axios'

function Home() {
  // setFile is function used to update the file variable
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [responseData, setResponseData] = useState()

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
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // sends HTTP POST request
    axios.post(url, formData, config)
    .then((response) => {
      const res = response.data
      console.log(response.data)
      setResponseData(({
        label: res.label,
        nutrition: res.nutrition,
        weight: res.weight
      }))
    })
    .catch((error) => {
      console.log(error.data);
      setResponseData({})
      navigate('/results', {state:{responseData}})
    });
  }


/*forward to results page once data is received*/
  useEffect(() => {
    if (responseData) {
      navigate('/results', {state:{responseData}})
    }
  }, [responseData]);

  const [showHoveringPage, setShowHoveringPage] = useState(false);

  function toggleHoveringPage() {
    setShowHoveringPage(!showHoveringPage);
  }

  return (
    <div className="Home">
      <header className="Home-header">
        {showHoveringPage && <Hover />}
        <button className="hovering-button" onClick={toggleHoveringPage}>
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
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}

export default Home;

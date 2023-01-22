import React, { useState } from 'react';
import logo from '../../resources/logo_512.png';
import Navigation from '../../elements/Navigation/Navigation';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Results from '../Results/Results';
import './Home.css';
// needs to installed
import axios from 'axios'

function Home() {
  // setFile is function used to update the file variable
  const [file, setFile] = useState()

  // handleChange is called when a file is uploaded, and uses the event as an argument to call setFile
  function handleUpload(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    // prevents default event behaviour (auto refresh)
    event.preventDefault()
    // creates variables for HTTP request
    // url needs to be changed to our backend server
    const url = 'https://eo259vge8sjhkes.m.pipedream.net';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    // sends HTTP POST request
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    })
  }

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/results' element={<Results/>} />
        </Routes>
      </Router>
      <header className="App-header">
        <h1>
          Welcome to FoodSnap!
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        {/* upload picture functionality */}
        <form onSubmit={handleSubmit}>
          <p>Upload a picture (png/jpeg/jpg) to get your calorie information!</p>
          {/* restricts file type to png, jpeg, jpg from upload window and calls upload event handler */}
          <input type="file" accept=".png,.jpeg,.jpg" onChange={handleUpload}/>
          <button type="submit">Upload</button>
        </form>
      </header>
    </div>
  );
}

export default Home;

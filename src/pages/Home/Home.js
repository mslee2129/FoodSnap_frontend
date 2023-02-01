import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../resources/food_love.png'
import Navigation from '../../elements/Navigation/Navigation'
import './Home.css'

function Home () {
  // setFile is function used to update the file variable
  const navigate = useNavigate()
  const [file, setFile] = useState()

  // handleChange is called when a file is uploaded, and uses the event as an argument to call setFile
  function handleUpload (event) {
    setFile(event.target.files[0])
  }

  function handleSubmit (event) {
    // prevents default event behaviour (auto refresh)
    event.preventDefault()
    // creates variables for HTTP request
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)

    navigate('/loading', { state: { formData } })
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>
          Welcome to FoodSnap!
        </h1>
        <img src={logo} className="Home-logo" alt="logo" />
        {/* upload picture functionality */}
        <form onSubmit={handleSubmit}>
          <p>To start upload a picture (.png/.jpeg/.jpg) to get your calorie information!</p>
          {/* restricts file type to png, jpeg, jpg from upload window and calls upload event handler */}
          <input type="file" accept=".png,.jpeg,.jpg" onChange={handleUpload}/>
          <button type="submit">Upload</button>
        </form>
      </header>
      <Navigation />
    </div>
  )
}

export default Home

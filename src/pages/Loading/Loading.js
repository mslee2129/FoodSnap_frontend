import React, { useState, useEffect } from 'react'
import './Loading.css'
import logo from '../../resources/loading.png'
import { useLocation, useNavigate } from 'react-router-dom'

import axios from 'axios'

function Loading () {
  const [responseData, setResponseData] = useState()
  const url = 'http://127.0.0.1:5000'
  const navigate = useNavigate()

  const formData = useLocation()

  // sends HTTP POST request
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  axios.post(url, formData, config)
    .then((response) => {
      const res = response.data
      console.log(response.data)
      setResponseData(({
        label: res.label,
        nutrition: res.nutrition
      }))
    })

  /* forward to results page once data is received */
  useEffect(() => {
    if (responseData) {
      navigate('/loading', { state: { responseData } })
    }
  }, [responseData])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please wait...
        </p>
      </header>
    </div>

  )
}

export default Loading

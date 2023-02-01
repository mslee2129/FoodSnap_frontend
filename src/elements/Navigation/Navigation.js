import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'
import logoHome from '../../resources/home.png'
import logoResults from '../../resources/results.png'

function Navigation () {
  return (
    <nav className='Navigation'>
        <Link to='/home' id='home_link'>
          <p>
            <img src={logoHome} className='logo' alt='home logo'/>
            Home
          </p>
        </Link>

        <Link to='/results' id='results_link'>
          <p>
            <img src={logoResults} className='logo' alt='results logo'/>
            Results
          </p>
        </Link>
    </nav>
  )
}

export default Navigation

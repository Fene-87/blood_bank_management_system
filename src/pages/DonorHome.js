import React from 'react'
import { Link } from 'react-router-dom'


function DonorHome() {
  return (
    <div>
      <div className='navigation-bar'>
        <div>
        <h2 className='nav-items'>Donor Home</h2>
        </div>
        <div className='nav-bar'>
        <Link to="/">  
          <h3 href='Home' className='nav-items'>Home</h3>
        </Link>
          <h3 className='nav-items'>History</h3>
          <h3 className='nav-items'>Campaigns</h3>
          <h3 className='nav-items'>Notifications</h3>
        <Link>
          <h3 className='nav-items'>Contact</h3>
        </Link>
        </div>
      </div>

      <div className='donor-home'>
        <div className='image-overlay'>

        </div>
      </div>
    </div>
  )
}

export default DonorHome
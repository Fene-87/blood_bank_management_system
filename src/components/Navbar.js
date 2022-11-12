import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <div className='navigation-bar'>
        <div>
        <h2 className='nav-items'>Blood Bank Management</h2>
        </div>
        <div className='nav-bar'>
        <Link to="/">  
          <h3 href='Home' className='nav-items'>Home</h3>
        </Link>
        <Link to="/blood_request">
          <h3 href='About'className='nav-items'>Request</h3>
        </Link>
        <Link>
          <h3 className='nav-items'>Search</h3>
        </Link>
        <Link to="/donor_reg">
          <h3 className='nav-items'>Donor</h3>
        </Link>
        <Link to="/admin_home">
          <h3 className='nav-items'>Admin</h3>
        </Link>
        <Link>
          <h3 className='nav-items'>Contact</h3>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
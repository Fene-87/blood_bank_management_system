import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isActive, setIsActive] = useState(false);

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
        
        <div>
          <h3 className='nav-items' onClick={() => {
            isActive ? setIsActive(false) : setIsActive(true);
          }}>Donor</h3>
          {isActive && <div style={{backgroundColor: 'rgb(9, 9, 65, 0.5)'}}>
            <Link to="/donor_reg">
              <h3 className='nav-items'>Sign Up</h3>
            </Link>
            <Link to="/donor_login">
              <h3 className='nav-items'>Sign In</h3>
            </Link>
            </div>}
        </div>
        <Link to="/admin_login">
          <h3 className='nav-items'>Admin</h3>
        </Link>
        <Link to="/contact_page">
          <h3 className='nav-items'>Contact</h3>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
import Axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {
  const [donorList, setDonorList] = useState([]);

  const getDonors = () => {
    Axios.get("http://localhost:3001/donors").then((response) => {
      console.log(response.data);
      setDonorList(response.data);
      console.log(donorList);
    })
  }

  return (
    <>
    <div className='navigation-bar'>
        <h2 className='nav-items'>Blood Bank System</h2>
        <div className='nav-bar'>
            <h3 className='nav-items'>Blood Banks</h3>
            <Link to="/admin_donors">
              <h3 className='nav-items' onClick={getDonors}>Donors</h3>
            </Link>
            <h3 className='nav-items'>Search</h3>
            
        </div>
    </div>

    {donorList.map((val, key) => {
      return <div>{val.full_name}</div>
    })}
    </>
  )
}

export default AdminNavbar
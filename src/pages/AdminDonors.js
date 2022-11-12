import React, { useState } from 'react'
import  Axios from 'axios'
import AdminNavbar from '../components/AdminNavbar'

function AdminDonors() {
    const [allDonors, setAllDonors] = useState([]);

  return (
    <div>
        <AdminNavbar />
        <div>
           Hello
        </div>
    </div>
  )
}

export default AdminDonors
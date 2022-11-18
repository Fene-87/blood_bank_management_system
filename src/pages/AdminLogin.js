import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Axios from 'axios';

function AdminLogin() {
  const [signin, setSignin] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const donLogin = () => {
    if(loginUsername === 'Admin' && loginPassword === '2022'){
      setSignin(false);
      setSuccess(true);
    } else {
      alert('Invalid username/password');
    }
  }
  return (
    <div>
      <Navbar />
      <div className='login-bg'>
        <div className='image-overlay'>
        {signin && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
         <input type="text" placeholder='Username' className='donor-input' onChange={(event) => {
          setLoginUsername(event.target.value)
         }} required/>
         <input type="password" placeholder='Password' className='donor-input' onChange={(event) => {
          setLoginPassword(event.target.value)
         }} required/>
         <button className='donor-btn' onClick={donLogin}>Login</button>
         </div>}

         {success && <div style={{width: '30rem', backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
           <h4 style={{marginLeft: 180}}>Login Successful</h4>
           <Link to="/admin_home">
             <button style={{marginLeft: 160}} className='donor-btn' onClick={() => {
                setSuccess(false)
                setSignin(true);
              }}>Continue</button>
           </Link>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Axios from 'axios';
import { Link } from 'react-router-dom';

function DonorLogin() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [signin, setSignin] = useState(true);

  const donLogin = () => {
    Axios.post('http://localhost:3001/donorlogin', {
      loginUsername: loginUsername,
      loginPassword: loginPassword,
    }).then((response) => {
      if(response.data.message){
        alert('Invalid Username/Password')
      }else {
        setSignin(false);
        setSuccess(true);
      }
    })
  }
  return (
    <div>
      <Navbar />
      <div className='login-bg'>
        <div className='image-overlay'>
        {signin && <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
         <input type="text" placeholder='Username' className='donor-input' onChange={(event) => {
          setLoginUsername(event.target.value)
         }} required/>
         <input type="password" placeholder='Password' className='donor-input' onChange={(event) => {
          setLoginPassword(event.target.value)
         }} required/>
         <button className='donor-btn' onClick={donLogin}>Login</button>
         </form>}

         {success && <div style={{width: '30rem', backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
           <h4 style={{marginLeft: 180}}>Login Successful</h4>
           <Link to="/donor_home">
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

export default DonorLogin
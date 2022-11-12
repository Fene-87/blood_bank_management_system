import React from 'react'
import Navbar from '../components/Navbar'

function BloodRequest() {
  return (
    <div>
        <Navbar />
        <div className='req-background'>
          <div className='image-overlay'>
           <div className='blood-request'>
            <input placeholder='Hospital Name' type="text" className='request-input'/>
            <input placeholder='Doctor Name' type="text" className='request-input'/>
            <input placeholder='Patient Name' type="text" className='request-input'/>
            <input placeholder='Location' type="text" className='request-input'/>
            <input placeholder='Units(in ml)' type="number" className='request-input'/>
            <input placeholder='Blood Group' type="text" className='request-input'/>
            <input placeholder='Reason' type="text" className='request-input'/>
            <button className='request-button'>Make Request</button>
          </div>
         </div>
        </div>
    </div>
  )
}

export default BloodRequest
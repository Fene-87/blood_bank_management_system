import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Axios from 'axios';

function BloodRequest() {
  const [hospitalName, setHospitalName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('');
  const [bloodUnits, setBloodUnits] = useState(0);
  const [bldGrp, setBldGrp] = useState('');
  const [reason, setReason] = useState('');

  const makeRequest = () => {
    Axios.post('http://localhost:3001/makerequest', {
      hospitalName: hospitalName,
      doctorName: doctorName,
      patientName: patientName,
      location: location,
      bloodUnits: bloodUnits,
      bldGrp: bldGrp,
      reason: reason,
    }).then(() => {
      console.log('succesfully requested');
    })
  }

  return (
    <div>
        <Navbar />
        <div className='req-background'>
          <div className='image-overlay'>
           <div className='blood-request'>
            <input placeholder='Hospital Name' type="text" className='request-input' onChange={(event) => {
              setHospitalName(event.target.value);
            }}/>
            <input placeholder='Doctor Name' type="text" className='request-input' onChange={(event) => {
              setDoctorName(event.target.value);
            }}/>
            <input placeholder='Patient Name' type="text" className='request-input' onChange={(event) => {
              setPatientName(event.target.value);
            }}/>
            <input placeholder='Location' type="text" className='request-input' onChange={(event) => {
              setLocation(event.target.value);
            }}/>
            <input placeholder='Units(in ml)' type="number" className='request-input' onChange={(event) => {
              setBloodUnits(event.target.value);
            }}/>
            <input placeholder='Blood Group' type="text" className='request-input' onChange={(event) => {
              setBldGrp(event.target.value);
            }}/>
            <input placeholder='Reason' type="text" className='request-input' onChange={(event) => {
              setReason(event.target.value);
            }}/>
            <button className='request-button' onClick={makeRequest}>Make Request</button>
          </div>
         </div>
        </div>
    </div>
  )
}

export default BloodRequest
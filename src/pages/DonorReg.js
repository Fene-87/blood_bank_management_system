import React, { useState } from 'react'
import  Axios  from 'axios';
import Navbar from '../components/Navbar';

function DonorReg() {

  const [nationalId, setNationalId] = useState('');
  const [donorName, setDonorName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [diseases, setDiseases] = useState('');
  

  const registerDonor = () => {
    Axios.post("http://localhost:3001/create", {
      nationalId: nationalId,
      donorName: donorName,
      birthDate: birthDate,
      gender: gender,
      bloodGroup: bloodGroup,
      address: address,
      contactNumber: contactNumber,
      email: email,
      diseases: diseases,
      
    }).then(() => {
      console.log('Successfully registered');
    })
  }

  return (
    <>
    <Navbar />
    <div className='donor_registration'>
      <div className='image-overlay'>
      <div className='donor_reg'>
       
       <input className='donor-input' type="text" placeholder='National ID' onChange={(event) => {
        setNationalId(event.target.value);
       }} required/>
       <input className='donor-input' type="text" placeholder='Full Name' onChange={(event) => {
        setDonorName(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='dd-mm-yyy' onChange={(event) => {
        setBirthDate(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='Gender' onChange={(event) => {
        setGender(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='Blood Group' onChange={(event) => {
        setBloodGroup(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='Address' onChange={(event) => {
        setAddress(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='Contact Number' onChange={(event) => {
        setContactNumber(event.target.value)
       }} required/>
       <input className='donor-input' type="email" placeholder='Email' onChange={(event) => {
        setEmail(event.target.value)
       }} required/>
       <input className='donor-input' type="text" placeholder='Diseases (if any)' onChange={(event) => {
        setDiseases(event.target.value)
       }} required/>
       <button className='donor-btn' onClick={registerDonor}>Register</button>
       </div>
      </div>
    </div>
    </>
  )
}

export default DonorReg
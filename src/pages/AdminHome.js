import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaSpinner, FaCheckSquare } from 'react-icons/fa'

function AdminHome() {
  useEffect(() => {
    setHomePage(true);
  }, [])

  const [donorList, setDonorList] = useState([]);
  const [bloodBankList, setBloodBankList] = useState([]);
  const [showDonors, setShowDonors] = useState(false);
  const [registerDonation, setRegisterDonation] = useState(false);
  const [homePage, setHomePage] = useState(false);
  const [bloodBank, setBloodBank] = useState(false);
  const [donorId, setDonorId] = useState('');
  const [donQuantity, setDonorQuantity] = useState(0);
  const [donBloodBank, setDonBloodBank] = useState('');
  const [donBloodGrp, setDonBloodGrp] = useState('');

  const getDonors = () => {
    Axios.get('http://localhost:3001/donors').then((response) => {
      setDonorList(response.data);
      console.log(response.data)
    })

    showDonors ? setShowDonors(false) : setShowDonors(true);
    setRegisterDonation(false);
    setHomePage(false)
    setBloodBank(false);
  }

  const regDon = () => {
    setShowDonors(false);
    setRegisterDonation(true);
    setHomePage(false);
    setBloodBank(false);
  }

  const showHome = () => {
    setHomePage(true);
    setShowDonors(false);
    setRegisterDonation(false);
    setBloodBank(false);
  }

  const showBloodBank = () => {
    Axios.get('http://localhost:3001/bbank').then((response) => {
      setBloodBankList(response.data);
      console.log(response.data);
    })
    setBloodBank(true);
    setHomePage(false);
    setShowDonors(false);
    setRegisterDonation(false);
  }

const newDonation = () => {
  Axios.post('http://localhost:3001/newdonation', {
    donorId: donorId,
    donQuantity: donQuantity,
    donBloodGrp: donBloodGrp,
    donBloodBank: donBloodBank,
  }).then(() => {
    console.log('success');
  })
}

  return (
    <div>
      <div className='navigation-bar'>
        <h2 className='nav-items'>Blood Bank System</h2>
        <div className='nav-bar'>
            <h3 className='nav-items' onClick={showHome}>Home</h3>
            <h3 className='nav-items' onClick={showBloodBank}>Blood Banks</h3>
            <h3 className='nav-items' onClick={getDonors}>Donors</h3>
            <h3 className='nav-items'>Search</h3>
            <h3 className='nav-items' onClick={regDon}>Donation</h3>
            
        </div>
    </div>

    {/**Admin Home Page */}

    {homePage && <div className='bg-container'>
      <div className='group-items'>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>A+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>B+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>AB+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>O+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>A-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>B-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>AB-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
         <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>O-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
         </div>
      </div>

      <div className='totals'>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Donors</h3>
            <FaUsers style={{color: 'blue'}} size={30}/>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Requests</h3>
            <FaSpinner style={{color: 'blue'}} size={30}/>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Approved Requests</h3>
            <FaCheckSquare style={{color: 'blue'}} size={30}/>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Blood Units</h3>
            <FaHandHoldingHeart style={{color: 'blue'}} size={30}/>
          </div>
        </div>
      </div>
      
      </div>}


      {/**Admin Donor List */}

    
    { showDonors && <div>
    {donorList.map((val, key) => {
      return <div className='donor-list'>
        <p className='each-donor'>{val.national_id}</p>
        <p className='each-donor'>{val.full_name}</p>
        <p className='each-donor'>{val.birth_date}</p>
        <p className='each-donor'>{val.gender}</p>
        <p className='each-donor'>{val.blood_group}</p>
        <p className='each-donor'>{val.address}</p>
        <p className='each-donor'>{val.contact_number}</p>
        <p className='each-donor'>{val.email}</p>
        <p className='each-donor'>{val.diseases}</p>
        <p className='each-donor'>{val.aadhar_card}</p>
        
      </div>
    })}
      </div>}


      {/**Admin Blood Donation */}

    {registerDonation && <div className='reg-donation'>
       <input type="text" placeholder='Donor ID' className='donation-input' onChange={(event) => {
        setDonorId(event.target.value);
       }}/>
       <input type="text" placeholder='Quantity' className='donation-input' onChange={(event) => {
        setDonorQuantity(event.target.value);
       }}/>
       <input type="text" placeholder='Blood Group' className='donation-input' onChange={(event) => {
        setDonBloodGrp(event.target.value);
       }}/>
       <input type="text" placeholder='Blood Bank' className='donation-input' onChange={(event) => {
        setDonBloodBank(event.target.value);
       }}/>
       <button onClick={newDonation}>Approve</button>
      </div>}


      {/**Admin All Blood Banks */}


    {bloodBank && <div>
      {bloodBankList.map((val, key) => {
        return <div>
          <div className='bank-list'>
          <h3>{val.bank_name}</h3>
          <p>{val.location}</p>
          <div className='bank-grid'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>A+</p>
              <p>{val.a_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>B+</p>
              <p>{val.b_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>AB+</p>
              <p>{val.ab_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>O+</p>
              <p>{val.o_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>A-</p>
              <p>{val.a_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>B-</p>
              <p>{val.b_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>AB-</p>
              <p>{val.ab_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
              <p>O-</p>
              <p>{val.o_neg_quantity}</p>
            </div>
          </div>
          </div>
        </div>
      })}
      </div>}
    
    </div>
  )
}

export default AdminHome
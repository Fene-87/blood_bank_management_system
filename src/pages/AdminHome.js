import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaSpinner, FaCheckSquare } from 'react-icons/fa'

function AdminHome() {
  useEffect(() => {
    setHomePage(true);
    homeAllBloods();
    donordon();
    requestStatus();
    
  }, [])

  const [donorList, setDonorList] = useState([]);
  const [bloodBankList, setBloodBankList] = useState([]);
  const [showDonors, setShowDonors] = useState(false);
  const [registerDonation, setRegisterDonation] = useState(false);
  const [homePage, setHomePage] = useState(false);
  const [bloodBank, setBloodBank] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [donorId, setDonorId] = useState('');
  const [donQuantity, setDonorQuantity] = useState(0);
  const [donBloodBank, setDonBloodBank] = useState('');
  const [donBloodGrp, setDonBloodGrp] = useState('');
  const [allBloods, setAllBloods] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [approveStatus, setApproveStatus] = useState([]);
  const [allStatus, setAllStatus] = useState([]);

  const approved = 'Approved';
  const rejected = 'Rejected';

  const donordon = () => {
    Axios.get('http://localhost:3001/donors').then((response) => {
      setDonorList(response.data);
      console.log(response.data)
    })
  }


  const getDonors = () => {
    Axios.get('http://localhost:3001/donors').then((response) => {
      setDonorList(response.data);
      console.log(response.data)
    })

    showDonors ? setShowDonors(false) : setShowDonors(true);
    setRegisterDonation(false);
    setHomePage(false)
    setBloodBank(false);
    setShowRequests(false);
  }

  const homeAllBloods = () => {
    Axios.get('http://localhost:3001/allbloods').then((response) => {
      let data = response.data[0];
      setAllBloods(Object.values(data));
      console.log(Object.values(data));
      
    })
  }

  const regDon = () => {
    setShowDonors(false);
    setRegisterDonation(true);
    setHomePage(false);
    setBloodBank(false);
    setShowRequests(false);
  }

  const showHome = () => {
    setHomePage(true);
    setShowDonors(false);
    setRegisterDonation(false);
    setBloodBank(false);
    setShowRequests(false);
  }

  const requestStatus = () => {
    Axios.get('http://localhost:3001/approvestatus').then((response) => {
      setApproveStatus(response.data)
    })

    Axios.get('http://localhost:3001/allstatus').then((response) => {
      setAllStatus(response.data)
    })
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
    setShowRequests(false);
  }

  /**Get All Blood Requests */

  const getAllRequests = () => {
    Axios.get('http://localhost:3001/showrequests').then((response) => {
      setAllRequests(response.data);
      console.log(response.data);
    })

    setShowRequests(true);
    setBloodBank(false);
    setHomePage(false);
    setShowDonors(false);
    setRegisterDonation(false);
  }

  /**Approve Request */
  const approveRequest = (id) => {
    Axios.put('http://localhost:3001/reqapprove', {
      id: id,
      status: approved,
    }).then(() => {
      console.log('request approved');
      setAllRequests(allRequests.map((val) => {
        return val.id === id 
               ? 
               {
                hospital_name: val.hospital_name,
                doctor_name: val.doctor_name,
                patient_name: val.doctor_name,
                location: val.location,
                blood_units: val.blood_units,
                blood_group: val.blood_group,
                reason: val.reason,
                status: approved,
               }
               :
               val
      }))
    })
  }

  /**Reject Request */
  const rejectRequest = (id) => {
    Axios.put('http://localhost:3001/reqreject', {
      id: id,
      status: rejected,
    }).then((response) => {
      console.log('request rejected');
      setAllRequests(allRequests.map((val) => {
        return val.id === id 
               ? 
               {
                hospital_name: val.hospital_name,
                doctor_name: val.doctor_name,
                patient_name: val.doctor_name,
                location: val.location,
                blood_units: val.blood_units,
                blood_group: val.blood_group,
                reason: val.reason,
                status: rejected,
               }
               :
               val
      }))
    })
  }


  /**Update Blood Donations As Well As Blood Bank Stock*/

const newDonation = () => {
  Axios.post('http://localhost:3001/newdonation', {
    donorId: donorId,
    donQuantity: donQuantity,
    donBloodGrp: donBloodGrp,
    donBloodBank: donBloodBank,
  }).then(() => {
    console.log('success');
  });

  if(donBloodGrp === 'A+'){

    Axios.put('http://localhost:3001/updateapos', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated A+ blood')
    })
  }else if(donBloodGrp === 'A-'){
    Axios.put('http://localhost:3001/updateaneg', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated A- blood')
    })
  }else if(donBloodGrp === 'B+'){
    Axios.put('http://localhost:3001/updatebpos', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated B+ blood')
    })
  }else if(donBloodGrp === 'B-'){
    Axios.put('http://localhost:3001/updatebneg', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated B- blood')
    })
  }else if(donBloodGrp === 'AB+'){
    Axios.put('http://localhost:3001/updateabpos', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated AB+ blood')
    })
  }else if(donBloodGrp === 'AB-'){
    Axios.put('http://localhost:3001/updateabneg', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated AB- blood')
    })
  }else if(donBloodGrp === 'O+'){
    Axios.put('http://localhost:3001/updateopos', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated O+ blood')
    })
  }else if(donBloodGrp === 'O-'){
    Axios.put('http://localhost:3001/updateoneg', {
      donBloodGrp: donBloodGrp,
      donBloodBank: donBloodBank,
      donQuantity: donQuantity
    }).then(() => {
      console.log('successfully updated O- blood')
    })
  }
}


  return (
    <div>
      <div className='navigation-bar'>
        <h2 className='nav-items'>ADMIN</h2>
        <div className='nav-bar'>
            <h3 className='nav-items' onClick={showHome}>Home</h3>
            <h3 className='nav-items' onClick={showBloodBank}>Blood Banks</h3>
            <h3 className='nav-items' onClick={getDonors}>Donors</h3>
            <h3 className='nav-items'>Search</h3>
            <h3 className='nav-items' onClick={regDon}>Donation</h3>
            <h3 className='nav-items' onClick={getAllRequests}>Requests</h3>
            
        </div>
    </div>

    {/**Admin Home Page */}

    {homePage && <div className='bg-container'>
      <div className='group-items'>
         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}> 
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>A+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div style={{alignItems: 'center', justifyContent: 'center'}}>
             <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[0]}ml</p>
          </div>
         </div>
         

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>B+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
            <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[1]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>AB+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[2]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>O+</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[3]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>A-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[4]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>B-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[5]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>AB-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[6]}ml</p>
          </div>
         </div>

         <div className='blood-group' style={{backgroundColor: 'rgb(9, 9, 65, 0.8)'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3 className='bg-text'>O-</h3>
            <FaHeart style={{color: 'rgb(159, 5, 36)'}} size={30}/>
          </div>
          <div>
          <p style={{marginLeft: 140, color: 'thistle', fontWeight: 'bold', fontSize: 25}}>{allBloods[7]}ml</p>
          </div>
         </div>
      </div>
      

      <div className='totals'>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Donors</h3>
            <FaUsers style={{color: 'blue'}} size={30}/>
          </div>
          <div>
            <p style={{marginLeft: 140, fontWeight: 'bold', fontSize: 25}}>{donorList.length}</p>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Requests</h3>
            <FaSpinner style={{color: 'blue'}} size={30}/>
          </div>
          <div>
            <p style={{marginLeft: 140, fontWeight: 'bold', fontSize: 25}}>{allStatus.length}</p>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Approved Requests</h3>
            <FaCheckSquare style={{color: 'blue'}} size={30}/>
          </div>
          <div>
            <p style={{marginLeft: 140, fontWeight: 'bold', fontSize: 25}}>{approveStatus.length}</p>
          </div>
        </div>
        <div className='blood-group'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
            <h3>Total Blood Units</h3>
            <FaHandHoldingHeart style={{color: 'blue'}} size={30}/>
          </div>
          <div>
            <p style={{marginLeft: 140, fontWeight: 'bold', fontSize: 25}}>{parseInt(allBloods[0]) + parseInt(allBloods[1]) + parseInt(allBloods[2]) + parseInt(allBloods[3]) +
              parseInt(allBloods[4]) + parseInt(allBloods[5]) + parseInt(allBloods[6]) + parseInt(allBloods[7])}ml</p>
          </div>
        </div>
      </div>
      
      </div>}


      {/**Admin Donor List */}

    
    { showDonors && <div style={{backgroundColor: '#D3D3D3'}}>
    <div className='donor-list' style={{borderStyle: 'none'}}>
        <p className='each-donor donor-head' style={{width: '8%'}}>National ID</p>
        <p className='each-donor donor-head' style={{width: '15%'}}>Full Name</p>
        <p className='each-donor donor-head'>Birth Date</p>
        <p className='each-donor donor-head' style={{width: '8%'}}>Gender</p>
        <p className='each-donor donor-head' style={{width: '8%'}}>Blood Grp</p>
        <p className='each-donor donor-head'>Address</p>
        <p className='each-donor donor-head'>Phone No</p>
        <p className='each-donor donor-head' style={{width: '17%'}}>Email</p>
        <p className='each-donor donor-head'>Diseases</p>
        
      </div>
    {donorList.map((val, key) => {
      return <div className='donor-list'>
        <p className='each-donor' style={{width: '8%'}}>{val.national_id}</p>
        <p className='each-donor' style={{width: '15%'}}>{val.full_name}</p>
        <p className='each-donor'>{val.birth_date}</p>
        <p className='each-donor' style={{width: '8%'}}>{val.gender}</p>
        <p className='each-donor' style={{width: '8%'}}>{val.blood_group}</p>
        <p className='each-donor'>{val.address}</p>
        <p className='each-donor'>{val.contact_number}</p>
        <p className='each-donor' style={{width: '17%'}}>{val.email}</p>
        <p className='each-donor'>{val.diseases}</p>
        
      </div>
    })}
      </div>}


      {/**Admin Blood Donation */}

    {registerDonation && <div className='donation-page'>
      <div className='reg-donation'>
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
       <button onClick={newDonation} className='donation-btn'>Approve</button>
       </div>
      </div>}


      {/**Admin All Blood Banks */}


    {bloodBank && <div style={{backgroundColor: '#D3D3D3'}}>
      {bloodBankList.map((val, key) => {
        return <div>
          
          <div className='bank-list'>
          <h3 style={{color: 'thistle', fontWeight: 'bold'}}>{val.bank_name}</h3>
          <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.location}</p>
          <div className='bank-grid'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>A+</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.a_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>B+</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.b_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>AB+</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.ab_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>O+</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.o_pos_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>A-</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.a_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>B-</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.b_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>AB-</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.ab_neg_quantity}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgb(9, 9, 65)', borderRadius: 8}}>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>O-</p>
              <p style={{color: 'thistle', fontWeight: 'bold'}}>{val.o_neg_quantity}</p>
            </div>
          </div>
          </div>
        </div>
      })}
      </div>}

      {/**Admin Requests List */}

      {showRequests && <div style={{backgroundColor: '#D3D3D3', height: '100%'}}>
      <div style={{display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
            <h4 style={{width: '8%', color: '#fff', fontSize: 25}}>Status</h4>
            <h4 style={{width: '13%', color: '#fff', fontSize: 25}}>Hospital Name</h4>
            <h4 style={{width: '13%', color: '#fff', fontSize: 25}}>Doctor Name</h4>
            <h4 style={{width: '13%', color: '#fff', fontSize: 25}}>Patient Name</h4>
            <h4 style={{width: '10%', color: '#fff', fontSize: 25}}>Location</h4>
            <h4 style={{width: '6%', color: '#fff', fontSize: 25}}>Units</h4>
            <h4 style={{width: '8%', color: '#fff', fontSize: 25}}>Group</h4>
            <h4 style={{width: '13%', color: '#fff', fontSize: 25}}>Reason</h4>
          </div>
        {allRequests.map((val, key) => {
          return <div style={{display: 'flex', flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
            <h4 style={{width: '8%'}}>{val.status}</h4>
            <h4 style={{width: '13%'}}>{val.hospital_name}</h4>
            <h4 style={{width: '13%'}}>{val.doctor_name}</h4>
            <h4 style={{width: '13%'}}>{val.patient_name}</h4>
            <h4 style={{width: '10%'}}>{val.location}</h4>
            <h4 style={{width: '6%'}}>{val.blood_units}</h4>
            <h4 style={{width: '8%'}}>{val.blood_group}</h4>
            <h4 style={{width: '13%'}}>{val.reason}</h4>
            <button className='approve-reject' style={{backgroundColor: 'green', marginRight: 5}} onClick={() => {approveRequest(val.id)}}>Approve</button>
            <button className='approve-reject' style={{backgroundColor: 'red'}} onClick={() => {rejectRequest(val.id)}}>Reject</button>
          </div>
        })}
        </div>}
    
    </div>
  )
}

export default AdminHome
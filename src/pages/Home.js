import React from 'react'
import Navbar from '../components/Navbar'


function Home() {
  return (
    <div>
        <Navbar />
        <div className='home-background'>
          <div className='image-overlay'>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <h3 style={{color: '#fff', fontSize: 30}}>Donate Blood & Save A Life</h3>
             
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Home
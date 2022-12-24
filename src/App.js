
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage';
import AdminDonors from './pages/AdminDonors';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import BloodRequest from './pages/BloodRequest';
import ContactsPage from './pages/ContactsPage';
import DonorHome from './pages/DonorHome';
import DonorLogin from './pages/DonorLogin';
import DonorReg from './pages/DonorReg';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/donor_reg' element={<DonorReg />}/>
      <Route path='/donor_login' element={<DonorLogin />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/admin_login' element={<AdminLogin />} />
      <Route path='/admin_home' element={<AdminHome />} />
      <Route path='/admin_donors' element={<AdminDonors />} />
      <Route path='/blood_request' element={<BloodRequest />} />
      <Route path='/donor_home' element={<DonorHome />}/>
      <Route path='/contact_page' element={<ContactsPage />} />
    </Routes>
  );
}

export default App;

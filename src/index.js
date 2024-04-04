import React, {useState}from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './componats/js/NavBar';
import Footer from './componats/js/Footer';
import LandingPage from './componats/js/Landing';
import AdminRegister from './componats/js/AdminRegister';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//import './componats/css/Teacher-dashboard.css';
import reportWebVitals from './reportWebVitals';
import Login from './componats/js/Login';
import AdminDashboard from './componats/js/admin/js/AdminDashboard';
import { ToastContainer, toast , } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Admin } from './componats/js/admin/js/admin';
import AdminRegister2 from './componats/js/AdminRegister2';


export default function App() {
  


 

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-register" element={<AdminRegister2 />} />
        <Route path="/login/:type" element={<Login  />} />
        <Route path='/admin' element={<Admin/>}> <Route path='dashboard/*' element={<AdminDashboard  />} /></Route>
        
      </Routes>
    </BrowserRouter>
  );
}
const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(
  <React.StrictMode>
    
    
    <App />
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover/>
    {/* <Footer /> */}
  </React.StrictMode>
  
);

reportWebVitals();

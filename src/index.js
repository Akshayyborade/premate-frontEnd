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


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

  return (
    <BrowserRouter>
    <NavBar name="DnyanDeep Tutorial" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/login/:type" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </BrowserRouter>
  );
}
const Root = ReactDOM.createRoot(document.getElementById('root'));
Root.render(
  <React.StrictMode>
    
    
    <App />
    {/* <Footer /> */}
  </React.StrictMode>
  
);

reportWebVitals();

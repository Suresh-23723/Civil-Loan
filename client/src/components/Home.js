import './Home.css';
import { useEffect, useState } from 'react';
import Service from './Service';
import { useNavigate } from 'react-router-dom';
const scbImage = require('../images/sbc.jpg');
const mfImage = require('../images/mf.png');
const Home = () => {

  const [services,setServices] = useState([]);
  const [SCBopen, setSCBOpen] = useState(false);
  const [MFopen, setMFOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/home")
    .then((res) => res.json())
    .then((data) => {
      if(data.status === 'success') {
        setServices(data.data.services);
      } else {
        setServices(data.data.message);
      }
    });
  },[]);

  const navigate = useNavigate();

  const handleEMIClick = () => {
    navigate("/emi");
  }

  const handleReqClick = () => {
    navigate("/req");
  }
  const handleSCBClose = () => {
      setSCBOpen(false);
  };

  const handleMFOpen = () => {
      setMFOpen(true);
  };

    const handleMFClose = () => {
      setMFOpen(false);
  };

  const handleSCBOpen = () => {
      setSCBOpen(true);
  };

  const handleLogin = () => {
      navigate("/login");
  }

  const handleSignup = () => {
    navigate("/new");
  }
  return (
    <div className="App">
      <div class="top">
        <div class="mr-auto display-4">Civil Loan</div>
        <button class="btn btn-success" id="signin" onClick={handleSignup}>Sign-up</button>
        <button class="btn btn-success" id="signin" onClick={handleLogin}>Login</button>
        </div>
      <div class="h2 text-center">
        Welcome to Civil-Loan
      </div>
      <div class="h3 text-center">
        services offered 
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div class="text-center">
              <img src={scbImage} class="rounded" alt="..." width="73%"/>
              <div class="h4">Small Scale Industries Loan</div>
              <button type="button" class="btn btn-primary btn-lg" onClick={handleSCBOpen}>View Details</button>
            </div>
          </div>
          <div class="col-sm">
            <div class="text-center">
              <img src={mfImage} class="rounded" alt="..." width="80%"/>
              <div class="h4">Micro-Finance Loan</div>
              <button type="button" class="btn btn-primary btn-lg" onClick={handleMFOpen}>View Details</button>
            </div>
          </div>
        </div>
        <Service isOpen={SCBopen} onClose={handleSCBClose} service={services[0]} handleEMIClick={handleEMIClick} handleReqClick={handleReqClick}/>
        <Service isOpen={MFopen} onClose={handleMFClose} service={services[1]} handleEMIClick={handleEMIClick} handleReqClick={handleReqClick}/>
      </div>
    </div>
  )
};

export default Home;
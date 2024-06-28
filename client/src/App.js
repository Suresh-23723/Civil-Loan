import {Routes , Route } from 'react-router-dom';
import Home from './components/Home';
import EMI from './components/EMI';
import Request from './components/Request';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import Update from './components/Update';

const App = () => { 
   return ( 
      <div className="App"> 
        <Routes> 
            <Route exact path="/" element={<Home/> } /> 
            <Route path="/emi" element={<EMI/> } /> 
            <Route path="/req" element={<Request/> } />
            <Route path="/new" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/landing" element={<Landing/>}/>
            <Route path="/update" element={<Update/>} />
       </Routes> 
    </div> 
)} 
export default App; 
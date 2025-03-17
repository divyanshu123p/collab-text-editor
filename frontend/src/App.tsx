// import { useState } from 'react'
import { useContext } from 'react';
import Login from './Components/Login';
import Navbar from './Components/Navbar'
import { CredentialCon } from './Components/credentialContext';
import Textbox from './Components/Textbox';
// import { Router} from 'react-router-dom';
// import './App.css'

function App() {
  const tt = useContext(CredentialCon);
  const { loggedIn } = tt;
  console.log('logger: ' + loggedIn);

  return (
    <>
    <Navbar/>
    
    {loggedIn===false && <Login/>}
  </>
  )
}

export default App

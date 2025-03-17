import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Components/Dashboard' 
import Textbox from '../Components/Textbox'
import { useContext, useEffect } from 'react'
import { CredentialCon } from '../Components/credentialContext'

function PrivateRoutes() {
  const t = useContext(CredentialCon);
  const {setLoggedIn} = t;

  useEffect(()=>{
    const tt = ()=>{
      setLoggedIn(true);
    };

    tt();
  },[]);

  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/:id" element={<Textbox/>}/>
    </Routes>
  )
}

export default PrivateRoutes

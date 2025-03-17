// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoutes from './Routes/PublicRoutes.tsx'
import PrivateRoutes from './Routes/PrivateRoutes.tsx'
import { CredentialProvider }  from './Components/credentialContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <CredentialProvider>
    <Routes>
      <Route path="/*" element={<PublicRoutes/>} />
      <Route path="/user/*" element={<PrivateRoutes/>} />
    </Routes>
    </CredentialProvider>
  </BrowserRouter>
  // </StrictMode>,
)

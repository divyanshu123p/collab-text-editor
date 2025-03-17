import { useState, createContext } from "react";

const CredentialCon = createContext(null);

function CredentialProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [ userNameTT, setUsernameTT ] = useState('');

  return (
    <CredentialCon.Provider value= {{loggedIn, setLoggedIn,  userNameTT, setUsernameTT }}>
        {children}
    </CredentialCon.Provider>
  )
}

export { CredentialCon, CredentialProvider };
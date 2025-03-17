import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialCon } from "./credentialContext";

const Navbar : React.FC = () => {
    const navigator = useNavigate();
    const tt = useContext(CredentialCon);
    const {loggedIn, setLoggedIn,  userNameTT, setUsernameTT } = tt;

    const logout = async ()=> {
        console.log('btn clicked');
        
        let out = await fetch('http://localhost:3000/user/logout',{
            credentials: 'include'
        }).then((res)=>{
            if(res.status===200){
                setLoggedIn(false);
            }

            return res;
        }).then(
            res=>res.json()
        );

        setUsernameTT('');

        console.log(out);
        navigator('/');
    }

    const handReg = ()=>{
        navigator('/register')
    };

    const handleHomeBtn = ()=>{
        if(loggedIn===true)
            navigator('/user/dashboard')
        else{
            navigator('/')
        }
    };

    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Text Collab</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link"  style={{cursor: 'pointer'}} onClick={handleHomeBtn}>Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handReg}>Register</a>
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>*/ }
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> */}
                        <h5 style={{marginRight: '3em'}}>{`Username: ${userNameTT}`}</h5>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {   loggedIn===true &&
                    <button type='button' className="btn btn-primary" onClick={logout} style={{float: 'right', marginLeft: '10px', borderRadius: '10px'}}>Logout</button>
                }
            </div>
        </nav>
    </div>
    );
};

export default Navbar;
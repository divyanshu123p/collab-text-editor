import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialCon } from './credentialContext';

function Login() {
    const navigator = useNavigate();
    const tt = useContext(CredentialCon);
    const { setLoggedIn, setUsernameTT  } = tt;
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
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
    
            console.log(out);
        };

        logout();
    }, []);

    const handleLogin = async (e) =>{
        e.preventDefault();

        let cred = { username: userName, password }; 
        console.log("This is going to be submitted: " + JSON.stringify(cred));
        
        let tkn = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {"Content-Type": "application/JSON"},
            body: JSON.stringify(cred),
            credentials: 'include'
        }).then((res)=>{
            if(res.status == 201){
                setLoggedIn(true);
                setUsernameTT(userName);
                navigator('/user/dashboard');
            }
            else{
                alert("login failed");
            }

            return res;
        });

        console.log('fetch request send');
        
        tkn = await tkn.json();
        console.log(tkn);
    }

  return (
    <div style={{margin: '100px', padding: '20px'}}>
        <h1>Login Page</h1>

        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <input type="text" className="form-control" id="exampleInputText" onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                <div id="emailHelp" className="form-text">We don't store passwords, we only verify them!</div>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login;
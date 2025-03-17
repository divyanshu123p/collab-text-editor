import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Register() {
    const navigator = useNavigate();
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleReg = async (e) =>{
        e.preventDefault();

        let cred = { username: userName, email, password }; 
        // console.log("This is going to be submitted: " + cred);
        
        let tkn = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {"Content-Type": "application/JSON"},
            body: JSON.stringify(cred),
            credentials: 'include'
        }).then((res)=>{
            if(res.status == 201){
                alert('Registration Successful!');
                navigator('/');
            }
            else{
                alert('registration failed');
            };

            return res;
        }).then(res=>res.json()).catch(()=>{
            alert('Network error');
        });

        // console.log('fetch request send');
        
        console.log(tkn);
    }


  return (
    <>
    <Navbar/>
    <div style={{margin: '100px', padding: '20px'}}>
        <h1>Register Page</h1>

        <form onSubmit={handleReg}>
            <div className="mb-3">
                <input type="text" className="form-control" id="exampleInputText" onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" id="exampleInputText" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                <div id="emailHelp" className="form-text">We don't store passwords, we only verify them!</div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
    </>
  )
}

export default Register;
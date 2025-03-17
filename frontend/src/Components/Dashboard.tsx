import { useEffect, useState } from "react"
import Navbar from "./Navbar";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigator = useNavigate();
  const [username, setUsername] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(()=>{
    const getDoc = async () => {

      let t = await fetch('http://localhost:3000/user/documents', {
        method: 'POST',
        // bod
        credentials: 'include'
      }).then(res=>res.json()); 
      
      setDocs(t);
      // console.log(docs);
    }

    getDoc();
    
  },[]);

  const inviteUser = async () => {
    let newId = await fetch('http://localhost:3000/user/invite',{
      method: 'POST',
      credentials: 'include',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'username_': username})
    }).then(
      res=>res.json()
    );
    
    navigator(`/user/${newId.documentId}`);
  }

  const openDocument = async (documentId) => {
    navigator(`/user/${documentId}`);
  }; 

  const handleUsername = (data: string) => {
    setUsername(data);
  };
        
  return (
    <div>
        <Navbar/>
        <div style={{margin:'100px', display: 'block'}}>
          <div className="card">
          <div className="card-header">
              <input type="username" onChange={(e)=>handleUsername(e.target.value)} placeholder="Enter Username"/>
              {/* {props.id} */}
          </div>
            <div className="card-body">
                <h5 className="card-title">Create New Document</h5>
                <a className="btn btn-primary" onClick={inviteUser}>Invite User</a>
            </div>
          </div>
        </div>   

        {
          docs.map((val, idx)=>
            // {
            // return (
            <div style={{margin:'100px', display: 'flex'}}>
              <Cards title={val.title} btnlabel='Open Document' handleCardfn={()=>openDocument(val.id)} id={val.id}/>
            </div>         
            // );
          // }
        )
        }

        {
          
        }
    </div>
  )
}

export default Dashboard
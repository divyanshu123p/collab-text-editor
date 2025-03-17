import { useState, useEffect } from 'react'
import socket from './Websocket.tsx';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar.tsx';

function Textbox() {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('Untitled');
    const { id } = useParams(); //id arg name should be same as defined in routes
    
    const ftemp = (updatedText: string)=>{
        console.log('text edited: ' + text);
        setText(updatedText);
    }

    useEffect(()=>{       
        const getSavedInfo = async() =>{
            let docu = await fetch('http://localhost:3000/user/retreivedoc',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({documentId: id})
            }).then(
                res=>res.json()
            );

            setText(docu.textBody);
            setTitle(docu.title);
        }

        getSavedInfo();
        
        socket.emit('join-document', id);   //connect to room
        
        socket.on('text-update', (incomingText)=>{
            setText(incomingText);
        });

        return ()=>{
            // handleSave();    //creates weird effects, don't use it

            socket.off('text-update', ftemp);
            // alert('listner turned off');
        };
    }, []);

    function txtHandler(e){
        const outgoingText = e.target.value;
        setText(outgoingText);
        // console.log(text);
        socket.emit('message', { documentId: id,  txt: outgoingText }); //argument name backend: argument name frontend
    }

    const handleSave = async()=>{
        let obj = {
            id: id,
            title: title,
            textBody: text
        };

        let save = await fetch('http://localhost:3000/user/savedoc', {
            method: 'POST',
            credentials:'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(obj)
        });
    }
    
    return (
        <>
        <Navbar/>
        <div className="form-group">
            <div  style={{display: 'flex'}}>
            <label style={{margin: '10px', fontSize: '1.4em', backgroundColor: 'lightgray', padding: '10px', borderRadius: '7px'}}>Text Editor</label>
            <textarea value={title} onChange={(e)=>setTitle(e.target.value)} style={{textAlign: 'center', margin: '0 auto', borderRadius: '7px', marginTop:'15px', marginBottom: '15px'}}/>
            <button type="button" className="btn btn-primary" onClick={handleSave} style={{margin: '10px', float: 'right'}}>Save</button>
            </div>
            <textarea style={{margin: '5px'}} className="form-control" rows={5} id="comment" onChange={txtHandler} value={text}/>
        </div>
        </>
    )
}

export default Textbox

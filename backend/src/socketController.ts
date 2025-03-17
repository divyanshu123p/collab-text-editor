import { io } from "./server";

const socketControllerFn = () => {
    io.on('connection', (socket) => {
        console.log('connected: ' + socket.id);

        socket.on('join-document', (documentId)=>{
            // console.log('document-user connected: ' + documentId);
            
            socket.join(documentId);
        });

        socket.on('message', ({documentId, txt})=>{
            // console.log(txt + " chal rha hai");

            socket.to(documentId).emit('text-update', txt);
            // console.log(socket.id + ' : ' + txt);
        });

        socket.on('disconnect', ()=>{
            console.log('disconnected');
        });
    });
}

export default socketControllerFn;
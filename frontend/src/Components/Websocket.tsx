import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.connect();
console.log('Connected to other user');

// const Con = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

export default socket;
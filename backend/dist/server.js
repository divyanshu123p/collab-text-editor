import 'dotenv/config';
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import route from './routes';
// import authRoute from './auth-routes.ts';
const PORT = parseInt(process.env.PORT);
const app = express();
const server_temp = http.createServer(app);
app.use(express.json());
app.use('/', route);
app.get('/ex', (req, res) => {
    res.send("This is express app");
});
const io = new Server(server_temp, {
    cors: { origin: '*' }
});
io.on('connection', (socket) => {
    console.log('connected: ' + socket.id);
    socket.on('message', (data) => {
        console.log(data + " chal rha hai");
        if (data === 'hello') {
            socket.emit('message', 'sun rha hu age bol');
        }
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});
server_temp.listen(PORT, () => {
    console.log(`express server is running at port ${PORT}`);
});
//# sourceMappingURL=server.js.map
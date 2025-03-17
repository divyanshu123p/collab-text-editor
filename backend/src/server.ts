import 'dotenv/config';
import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import route from './Routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import privateRoute from './Routes/privateRoutes';
import socketControllerFn from './socketController';

const PORT:number = parseInt(<string>process.env.PORT);
const app = express();

const server_temp = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/', route);
app.use('/user/', privateRoute);

app.get('/ex',  (req, res)=>{
    res.send("This is express app");
});

const io = new Server(server_temp, {
    cors: {origin: '*'}
});

socketControllerFn();

server_temp.listen(PORT, ()=>{
    console.log(`express server is running at port ${PORT}`);
});

export { io };
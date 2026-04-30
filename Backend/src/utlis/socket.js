import {app} from "../index.js"
import http from "http";
import {Server} from "socket.io";


const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});

export {io,server}
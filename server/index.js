import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

import {PORT} from './config.js'

const app = express(); // app de express
const server = http.createServer(app); // servidor de http compatible con socketio
const io = new SocketServer(server); // servidor con socketio

app.use(cors()); // configuracion de cors - para conflictos con servidores
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

import { PORT } from "./config.js";

const app = express(); // app de express
const server = http.createServer(app); // servidor de http compatible con socketio
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
}); // servidor con socketio

app.use(cors()); // configuracion de cors - para conflictos con servidores
app.use(morgan("dev"));

// escuchar eventos con io
io.on("connection", (socket) => {
  console.log(`id: ${socket.id}`);

  // escuchar el evento message del front-end | nombre valor
  socket.on("message", (message) => {
    // reenviar el valor capturado al front-end | nombre valor
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

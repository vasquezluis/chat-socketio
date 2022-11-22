import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { PORT } from "./server/config.js";

const app = express(); // app de express
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
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

app.use(express.static(join(__dirname, 'client/build')));

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// pasar direccion de websockets
// const socket = io("http://localhost:4000"); // escuchar eventos y enviar eventos
const socket = io();

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar al backend - nombre valor
    socket.emit("message", message);

    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  // useeffect para escuchar los eventos desde que carga la aplicacion
  useEffect(() => {
    const reciveMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, [messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
      <h1 className="text-2xl font-bold my-2">Chat react</h1>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinz-500 p-2 text-black w-full"
        />
        {/* <button className="bg-blue-500">Send</button> */}
        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me"
                  ? "my-2 p-2 bg-sky-700 ml-auto"
                  : "bg-black"
              }`}
            >
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;

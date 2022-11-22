import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// pasar direccion de websockets
const socket = io("http://localhost:4000"); // escuchar eventos y enviar eventos

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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send</button>
      </form>

      {messages.map((message, index) => (
        <div key={index}>
          <p>
            {message.from}: {message.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;

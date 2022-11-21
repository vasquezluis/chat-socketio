import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

// pasar direccion de websockets
const socket = io("http://localhost:4000"); // escuchar eventos y enviar eventos

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar al backend - nombre valor
    socket.emit("message", message);

    setMessage("");
  };

  // useeffect para escuchar los eventos desde que carga la aplicacion
  useEffect(() => {
    const reciveMessage = (message) => {
      console.log(message);
    };
    socket.on("message", reciveMessage);

    return () => {
      socket.off("message", reciveMessage);
    };
  }, []);

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
    </div>
  );
}

export default App;

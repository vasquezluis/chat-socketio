import "./App.css";
import io from 'socket.io-client'

// pasar direccion de websockets
const socket = io('http://localhost:4000') // escuchar eventos y enviar eventos

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;

// import "./App.css";
// import io from "socket.io-client";
// import { useState } from "react";
// import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");

// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [showChat, setShowChat] = useState(false);

//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };

//   return (
//     <div className="App">
//       {!showChat ? (
//         <div className="joinChatContainer">
//           <h3>Join A Chat</h3>
//           <input
//             type="text"
//             placeholder="John..."
//             onChange={(event) => {
//               setUsername(event.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Room ID..."
//             onChange={(event) => {
//               setRoom(event.target.value);
//             }}
//           />
//           <button onClick={joinRoom}>Join A Room</button>
//         </div>
//       ) : (
//         <Chat socket={socket} username={username} room={room} />
//       )}
//     </div>
//   );
// }

// export default App;
import React,{useState} from 'react'
import io from 'socket.io-client';
import Chat from './Chat';
import "./App.css";

// const socket=io.connect("http://localhost:5000")
const socket=io.connect("http://localhost:5000")

const App = () => {
  const [username,setUserName]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false)

  const joinRoom=()=>{
    if(!username=="" && !room==""){
      socket.emit("join-room",room)
      setShowChat(true)
    }
  }
  return (
 
      <div className='App'>
         {!showChat ? (
      <div className="joinChatContainer">
  <h3>Join A Chat</h3>
        <input type="text" placeholder='Rahul...' onChange={(event)=>setUserName(event.target.value)} /><br/>
        <input type="text" placeholder='room no....' onChange={(event)=>setRoom(event.target.value)} /><br/>
        <button onClick={joinRoom}>Join A Room</button>
        </div>
    ):(
  <Chat socket={socket} username={username} room={room}/>)}
 
    </div>
  )
}

export default App
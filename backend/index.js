const express = require('express');
const app = express();
const port = 5000;
const cors=require("cors");
const http=require("http")
const {Server}=require("socket.io");

// Middleware
app.use(cors());
app.use(express.json());
const server=http.createServer(app);

const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["POST","GET"]
  }
})
io.on("connection",(socket)=>{
  console.log("userConnected :",socket.id)
  socket.on('join-room',(room)=>{
    console.log(`user ${socket.id} connected at romm no ${room}`)
    socket.join(room)
  })
  socket.on("send-message",(data)=>{
    console.log(data)
    socket.to(data.room).emit("receive-message",data)
    console.log("Message sent to room:", data.room);
  })
  socket.on("disconnect",()=>{
    console.log("User Disconnected :",socket.id)
  })
})


// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

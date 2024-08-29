const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app= express();
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/msgRoutes");
const socket = require("socket.io");

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages", msgRoutes);

mongoose.connect(process.env.MONGO_URL,{ 
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    // serverSelectionTimeoutMS: 5000 ,
}).then(()=>{
    console.log("DB connection successful");
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server started at PORT ${process.env.PORT}`);
});

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        credentials: true,

    },
});

global.onlineUsers = new Map();
const users={};
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        // console.log("sendmsg ", {data});
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    });

    socket.on("new-user-joined",name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
        
    });
    
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',{message: message, name: users[socket.id]});
    });

    // socket.on('disconnect', message=>{
    //     socket.broadcast.emit('left',users[socket.id]);
    //     delete users[socket.id];
    // });

    socket.on('disconnect', () => {
        if (users[socket.id]) {
          const disconnectedUser = users[socket.id];
          delete users[socket.id];
      
          // Check if it's not a reconnection
          if (!socket.connected) {
            socket.broadcast.emit('left', disconnectedUser);
          }
        }
      });
 
    
});







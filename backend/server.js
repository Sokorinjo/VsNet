import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import crypto from "crypto";

dotenv.config();
const PORT = process.env.PORT || 8000;

import { router as userRouter } from "./routes/userRoutes.js";
import { router as postRouter } from "./routes/postRoutes.js";
import { router as commentRouter } from "./routes/commentRotes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { builtinModules } from "module";

//Connect to DB
connectDB();

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(cookieParser());

//Socket io
const ADMIN = "Admin"
const io = new Server(expressServer, {
  cookie: true,
  cors: {
    origin:
      process.env.NODE_ENV === "development"
        ? false
        : [
            "http://localhost:3001",
            "http://localhost:3000",
            "http://localhost:3002",
            "http://localhost:3003",
          ],
    credentials: true,
  },
});

//state
const UsersState = {
  users: [],
  setUsers: function(newUsersArray) {
    this.users = newUsersArray
  }
}

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);

  //Upon connection - only to user
  // socket.emit("message", "Welcome to Chat App!");

  socket.on('enterRoom', ({ username, room}) => {
    //leave previous room
    const prevRoom = getUser(socket.id)?.room

    if(prevRoom){
      socket.leave(prevRoom)
      io.to(prevRoom).emit('message', buildMsg(ADMIN, `${username} has left the room.`))
    }

    const user = activateUser(socket.id, username, room)

    //Cannot update previous room users list until after the state update in activate user
    if(prevRoom) {
      io.to(prevRoom).emit('userList', {
        users: getUsersInRoom(prevRoom)
      })
    }

    //join room
    socket.join(user.room)

    //To user who joined
    socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`))

    //To everyone else
    socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.username} has joined the room`))

    //update user list for room
    io.to(user.room).emit('userList', {
      users: getUsersInRoom(user.room)
    })

    //Update active 
    io.emit('roomList', {
      rooms:getAllActiveRooms()
    })
  })
  
  //When user disconnects
  socket.on("disconnect", () => {
    const user = getUser(socket.id)
    userLeavesApp(socket.id)

    if(user){
      io.to(user.room).emit('message', buildMsg(ADMIN, `${user.username} has left the room`))

      io.to(user.room).emit('userList', {
        users: getUsersInRoom(user.room)
      })

      io.emit('roomList', {
        rooms: getAllActiveRooms
      })
    }
  });

  //Upon connection - to all users
  // socket.broadcast.emit('message', buildMsg(ADMIN, "Welcome to Chat App!"))

  //Receive message
  socket.on("message", ({username, text}) => {
    const room = getUser(socket.id)?.room
    if(room){
      io.to(room).emit("message", buildMsg(username, text))
    }
  });

  //Listen for activity
  socket.on('activity', (username) => {
    const room = getUser(socket.id)?.room
    if(room) {
      socket.broadcast.to(room).emit('activity', username)
    }
  })
});

function buildMsg(username, text) {
  return {
    username, 
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date())
  }
}

//User state functions
function activateUser(id, username, room) {
  const user = {id, username, room}
  UsersState.setUsers([
    ...UsersState.users.filter(user => user.id !== id),
    user
  ])
  return user
}

function userLeavesApp(id) {
  UsersState.setUsers(
    UsersState.users.filter(user => user.id !== id)
  )
}

function getUser(id) {
  return UsersState.users.find(user => user.id === id) 
}

function getUsersInRoom(room) {
  return UsersState.users.filter(user => user.room === room)
}

function getAllActiveRooms(){
  return Array.from(new Set(UsersState.users.map(user => user.room)))
}



//rest of the backend

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "HOME PAGE" });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
// app.use("/api/chat")

app.use(notFound);
app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`.cyan.underline);
// });

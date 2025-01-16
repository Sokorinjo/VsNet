import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
const socket = io.connect("http://localhost:5000", { autoConnect: false });

import {
  Box,
  Button,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";

const Chat = () => {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState("");
  const [activity, setActivity] = useState("");
  const [userList, setUserList] = useState([]);
  const [roomList, setRoomList] = useState([]);

  const username = useSelector((state) => state.auth.username);

  const handleMessageInput = (e) => {
    setMessageInput(e.target.value);
    socket.emit("activity", username);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {
      username: username,
      text: messageInput,
    });
    setMessageInput("");
    setActivity("");
  };

  const handleChatRoom = (e) => {
    setChatRoom(e.target.value);
    console.log(chatRoom);
  };

  const enterRoom = (e) => {
    e.preventDefault();
    socket.emit("enterRoom", {
      username: username,
      room: chatRoom,
    });
    setMessages([])
  };

  useEffect(() => {
    socket.auth = { username };
    socket.connect();

    let activityTimer;
    socket.on("activity", (username) => {
      setActivity(username);

      //clear after 1 sec
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setActivity("");
      }, 1500);
    });

    socket.on("message", (data) => {
      // const { username, text, time } = data;
      // console.log(data)
      if(data.username === "Admin"){        
        toast(`${data.text}`)
      }else{
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on('join')
    socket.on("userList", ({users}) => {
      setUserList([...users])
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <Container>
      {/* Chat Room Form */}
      <Box
        component="form"
        autoComplete="false"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          marginBottom:3,
          gap: 3,
        }}
        // onSubmit={handleSubmit}
      >
        <TextField
          
          label="Chat room"
          value={chatRoom}
          onChange={handleChatRoom}
          type="text"
          size="small"
          color="accent"
        ></TextField>
        <Button onClick={enterRoom} disabled={chatRoom ? false : true} variant="contained">
          Join
        </Button>
      </Box>
      {/* <Box sx={{height:"300px" ,width: "80vw", textAlign: "center", border:" 1px solid silver"}}> */}
      {/* <Paper variant="outlined" sx={{ overflowY:"scroll"}}></Paper> */}

      {/* </Box> */}

      <Box sx={{height: "400px"}}>
        <Paper sx={{overflowY: "scroll",height:"400px",paddingLeft: "20px", paddingRight:"20px", paddingTop: "18px"}}>
          {messages.map((message) => {
            if (message.username !== username) {
              return (
                <div>
                  {message.username}: {message.text}
                </div>
              );
            } else if (message.username === username) {
              return (
                <div style={{ textAlign: "right" }}>
                  {/* {message.username}: {message.text} */}
                  {"You: "}{message.text}
                </div>
              );
            }
          })}
        </Paper>
      </Box>

      {/* Message Form */}
      <Box
        component="form"
        autoComplete="false"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // marginTop: 10,
          // gap: 3,
        }}
      >
        <TextField
        fullWidth
          // sx={{ width: 300 }}
          value={messageInput}
          onChange={handleMessageInput}
          // label="Message"
          placeholder="Type here to chat..."
          type="text"
          size="medium"
          color="accent"
        >
        </TextField>
        <Button  variant="contained" onClick={sendMessage} disabled={messageInput ? false : true}>
          Send
        </Button>
      </Box>
      {/* // onSubmit={handleSubmit} */}

      {/* <List>
        <ListItem>
          <ListItemText>User List</ListItemText>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemText>Room List</ListItemText>
        </ListItem>
      </List> */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        gap: 1
      }}>
        <Typography variant="subtitle1" mr={2}>Users:</Typography>
        {userList.map((user) => (
          <div > <i>{user.username}</i> </div>
        ))}
      </Box>

      <Typography variant="subtitle1">
        {activity ? <i>{activity} is typing</i> : ""}
      </Typography>

      {/* <div>
        {messages.map((message) => {
          if (message.username !== username) {
            return (
              <div>
                {message.username}: {message.text}
              </div>
            );
          } else if (message.username === username) {
            return (
              <div style={{ textAlign: "right" }}>
                {message.username}: {message.text}
              </div>
            );
          }
        })}
      </div> */}
    </Container>
  );
};

export default Chat;

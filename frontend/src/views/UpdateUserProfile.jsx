import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Password from "../components/Password.jsx";
import {
  Container,
  Stack,
  Avatar,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
// import {useUpdateUserMutation, useGetUserProfileQuery} from '../features/users/usersApiSlice.js'
import { useGetUserProfileQuery, useUpdateUserMutation } from "../features/users/usersApiSlice.js";

const UpdateUserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState({
    name: "",
    lastname: "",
  });
  const [userState, setUserState] = useState();

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const {data: userData, isLoading: isUserLoading} = useGetUserProfileQuery( {
    pollingInterval: 60000,

  })
  const [updateUser, {}] = useUpdateUserMutation()

  console.log(userData)
  let user;
  useEffect(() => {
    if (isUserLoading) {
      console.log("Getting data...");
      console.log(userData)
    } else {
      userData;
      setFullName(prev=> ({
        name: userData.name,
        lastname: userData.lastname
      }))
      setUsername(userData.username)
      setEmail(userData.email)

    }
    console.log(user);
  }, [isUserLoading]);

  // const [updateUser, { isSucces, isLoading, isError, error }] =
  //   useUpdateUserMutation();

  const handleFullName = (e) => {
    console.log(e.target.value);
    setFullName((fullName) => ({
      ...fullName,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {name, lastname} = fullName
      const user = await updateUser({name, lastname, username, email}).unwrap()
      // const user = await updateUser({name: "Vlada", lastname: "Sokorac", username:"vlada", email: "vlada@gmail.com", password: 'dasdadasd'}).unwrap()
      console.log(user)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <Container sx={{ maxWidth: 600 }}>
      <Typography variant="h2">Update User Profile</Typography>
      <Box
        component="form"
        autoComplete="false"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
          gap: 3,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ width: 300 }}
          label="Name"
          name="name"
          value={fullName.name}
          onChange={(e) => handleFullName(e)}
          size="small"
          color="accent"
        ></TextField>
        <TextField
          sx={{ width: 300 }}
          label="Lastname"
          name="lastname"
          value={fullName.lastname}
          onChange={(e) => handleFullName(e)}
          size="small"
          color="accent"
        ></TextField>
        <TextField
          sx={{ width: 300 }}
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          size="small"
          color="accent"
        ></TextField>
        <TextField
          sx={{ width: 300 }}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          size="small"
          color="accent"
          value={email}
        ></TextField>
{/* 
        <Password passwordFunc={handlePassword} id={"Old Password"} />
        <Password passwordFunc={handlePassword} id={"New Password"} />
        <Password passwordFunc={handleConfirmPassword} id={"Confirm New Password"} /> */}
        
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: 300 }}
        >
          Submit Changes
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateUserProfile;

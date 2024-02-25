import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Box,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { Palette, Person } from "@mui/icons-material";
import Password from "../components/Password";
import { useRegisterUserMutation } from "../features/users/usersApiSlice";

const RegisterPage = () => {
  const [fullName, setFullName] = useState({
    name: "",
    lastname: "",
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleFullName = (e) => {
    setFullName((fullName) => ({
      ...fullName,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fullName.name)
    if (!email || !username || !password) {
      toast.error('Please input all fields.')
    } else if (password !== confirmPass) {
      toast.error("Password do not match!");
    } else {
      try {
        const {name, lastname} = fullName
        console.log(name, lastname)
        const user = await registerUser({name, lastname, username, email, password }).unwrap();
        toast.success("Successfuly registered! Now enter your information to login.");
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <Container sx={{ maxWidth: 500 }}>
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
        <Avatar sx={{ bgcolor: "accent.main" }}>
          <Person />
        </Avatar>
        <Stack direction="row" spacing={2} width={300}>
          <TextField
            sx={{}}
            label="Name"
            name="name"
            value={fullName.name}
            onChange={(e) => handleFullName(e)}
            size="small"
            color="accent"
          ></TextField>
          <TextField
            sx={{}}
            label="Lastname"
            name="lastname"
            value={fullName.lastname}
            onChange={(e) => handleFullName(e)}
            size="small"
            color="accent"
          ></TextField>
        </Stack>
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
        ></TextField>

        <Password passwordFunc={handlePassword} id={"Password"} />
        <Password passwordFunc={handleConfirmPassword} id={"Confirm Password"} />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: 300 }}
        >
          Register
        </Button>

        <Stack>
          <Link to={"/login"}>Already have an account? Log in!</Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default RegisterPage;

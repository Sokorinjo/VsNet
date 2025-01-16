import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Password from "../components/Password";
import { Lock } from "@mui/icons-material";
import { setCredentials } from "../features/auth/authSlice";
// import { useLoginMutation } from "../features/users/authUsersSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import usePersist from "../hooks/usePersist.js";

import {
  Container,
  TextField,
  Box,
  Button,
  Avatar,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.token);

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const handlePassword = (e) => setPassword(e.target.value);

  const handlePersist = () => setPersist(prev => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please input all fields.");
    } else {
      try {
        const { currentId, accessToken, username } = await loginUser({
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ username, accessToken, currentId }));
        // setEmail('')
        // setPassword('')
        navigate("/");
      } catch (err) {
        // toast.error(error?.data?.message || error.error);
        console.log(err?.data?.message || error.error);
        toast.error(err?.data?.message || error.error);
      }
    }
  };

  return (
    <Container sx={{ width: 500 }}>
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
          <Lock />
        </Avatar>
        <TextField
          sx={{ width: 300 }}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          size="small"
          color="accent"
        ></TextField>

        <Password passwordFunc={handlePassword} id={"Password"} />

        <FormControlLabel control={<Checkbox checked={persist} onChange={handlePersist}/>} label="Keep me logged in"/>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: 300 }}
        >
          Login
        </Button>

        <Stack color="accent">
          <Link to={"/register"}>First time visiting? Register!</Link>
        </Stack>

      </Box>
    </Container>
  );
};

export default LoginPage;

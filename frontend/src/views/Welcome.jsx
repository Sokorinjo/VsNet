import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useSelector } from "react-redux";
import { selectCurrenToken } from "../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Welcome = () => {
  const token = useSelector(selectCurrenToken);

  if (token) {
    console.log(token);
  } else {
    console.log("No token; Log In.");
  }

  return (
    <>
      {token === null ? (
        <Container
          sx={{ display: "flex", justifyContent: "center", maxWidth: "850px" }}
        >
          <CssBaseline />
          <Paper elevation={2} sx={{}}>
            <Box pt={"15px"} pb={"15px"}>
              <Typography variant="h2" color="text.main" textAlign={"center"}>
                Welcome to VS <i>net</i>
              </Typography>
              <Typography color="text.main" textAlign={"center"}>
                This is an app built by a student as a school project. As it is
                built by a single person, don't expect too much. Be nice to
                others, and most importantly - <b> enjoy!</b>{" "}
                <span>
                  <TagFacesIcon />{" "}
                </span>{" "}
              </Typography>
              <Container mt={"15px"} pl={"50px"}>
                {/* left - register */}
                <List sx={{display: "flex"}}>
                  <ListItem >
                    <ListItemButton component={Link} to="/register" sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
                      <ListItemIcon >
                        <AccountCircleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Register"} />
                    </ListItemButton>
                  </ListItem >
                  <ListItem >
                    <ListItemButton component={Link} to="/login" sx={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
                      <ListItemIcon sx={{display: "inline"}}>
                        <LoginOutlined />
                      </ListItemIcon>
                      <ListItemText primary={"Login"} />
                    </ListItemButton>
                  </ListItem>
                </List>
                {/* <Typography variant="h5" ml={"15px"} component="div">Before you enter:</Typography>
                <List>
                  <ListItem >
                    <ListItemText primary={"Don't use any personal info!"} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={"Be nice, respect others"} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={"Don't use any personal info!"} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={"Don't use any personal info!"} />
                  </ListItem>
                </List> */}
              </Container>
            </Box>
          </Paper>
        </Container>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Welcome;

//material
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Avatar, Paper, Stack } from "@mui/material";

//icons-material
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InfoIcon from "@mui/icons-material/Info";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

//components, react, redux...
import * as React from "react";
import { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrenToken } from "../features/auth/authSlice";
import usePersist from "../hooks/usePersist";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeaderHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
//
//
//
//
//MAIN FUNCTION EXPORT

const DrawerOC = ({ handleDarkTheme, themeProp }) => {
  const [open, setOpen] = React.useState(false);
  // let [checked, setChecked] = React.useState(themeProp);

  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();

  const handleDrawerActions = () => {
    setOpen((prev) => !prev);
  };

  const [logoutUser, { isError, isSuccess }] = useSendLogoutMutation();

  const token = useSelector(selectCurrenToken);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.setItem("persist", false);
      setOpen(false);
      navigate("/login");
      toast("Logged out.");
    } catch (err) {
      console.log(err.error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <Paper> */}
      <Stack
        position="fixed"
        sx={{
          backgroundColor: "background",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            color="text.main"
            sx={{ textDecoration: "none" }}
          >
            <b>
              VS<i>net</i>
            </b>
          </Typography>

          {/* Open drawer button */}
          <IconButton
            disabled={token ? false : true}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerActions}
            edge="end"
            sx={{ mr: 2, ...(open && { display: "" }) }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          {themeProp ? <LightModeIcon /> : <DarkModeIcon />}

          {/* Theme switch */}
          <Switch onClick={handleDarkTheme} checked={themeProp} />

          {/* Logout button */}
          {token ? (
            <Button onClick={handleLogout} sx={{ marginLeft: 2 }}>
              {" "}
              <LogoutIcon /> Logout{" "}
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </Stack>
      {/* </Paper> */}
      <Drawer
        sx={{
          height: "calc(100%-64px)",
          top: "64px",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeaderHeader></DrawerHeaderHeader>
        {/* <DrawerHeaderHeader>dsadad</DrawerHeaderHeader> */}
        <Divider />
        {/* <List></List> */}
        <Divider />
        {token ? (
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText primary={"View Profile"}></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/chat">
                <ListItemIcon sx={{ paddingLeft: "5px"}}>
                  <ForumRoundedIcon sx={{fontSize: "30px",}}/>
                </ListItemIcon>
                <ListItemText primary={"Chat"}></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Register"}>Register</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"}>Login</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <List
          sx={{
            width: drawerWidth - 1,
            position: "fixed",
            bottom: "10px",
          }}
        >
          {token ? (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ color: "text.primary" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"}>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          ) : (
            ""
          )}

          {["Settings", "News", "Info"].map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                component={Link}
                to={
                  index === 0
                    ? "/settings"
                    : index === 1
                    ? "/news"
                    : index === 2
                    ? "/info"
                    : ""
                }
              >
                <ListItemIcon sx={{ color: "text.primary" }}>
                  {index === 0 ? (
                    <SettingsIcon />
                  ) : index === 1 ? (
                    <NewspaperIcon />
                  ) : index === 2 ? (
                    <InfoIcon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeaderHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default DrawerOC;

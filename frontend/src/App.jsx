import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Container, Toast } from "react-bootstrap";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header.jsx";
import { lightTheme, darkTheme } from "./utils/ThemeOptions.js";
import DrawerOC from "./components/DrawerOC";

const App = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(JSON.parse(localStorage.getItem("theme")));
  }, []);

  const handleDarkTheme = () => {
    setDark((prev) => !prev);
    console.log(dark);
    if (dark) {
      localStorage.setItem("theme", false);
    } else {
      localStorage.setItem("theme", true);
    }
  };

  return (
    <>
      <ThemeProvider
        theme={
          JSON.parse(localStorage.getItem("theme")) ? darkTheme : lightTheme
        }
      >
        <ToastContainer
          theme={JSON.parse(localStorage.getItem("theme")) ? "dark" : "light"}
        />
        {/* <CssBaseline /> */}
        <DrawerOC
          handleDarkTheme={handleDarkTheme}
          themeProp={JSON.parse(localStorage.getItem("theme"))}
        >
          <Outlet />
        </DrawerOC>
      </ThemeProvider>
      {/* <Footer /> */}
    </>
  );
};

export default App;

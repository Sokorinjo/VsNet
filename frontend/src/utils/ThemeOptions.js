import { createTheme } from "@mui/material";

let lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      main: "#000000",
    },
    background: {
      main: "#ffffff",
    },
    primary: {
      main: "#8b15cb",
    },
    secondary: {
      main: "#e3bff8",
    },
    accent: {
      main: "#320849",
    },
  },
});

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      main: "#ffffff",
    },
    background: {
      main: "#000000",
    },
    primary: {
      main: "#8b15cb",
    },
    secondary: {
      main: "#13031c",
    },
    accent: {
      main: "#9117d3",
    },
  },
});

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          text: {
            main: "#000000",
            alt: "#ffffff"
          },
          background: {
            main: "#ffffff",
          },
          primary: {
            main: "#8b15cb",
          },
          secondary: {
            main: "#e3bff8",
          },
          accent: {
            main: "#320849",
          },
        }
      : {
          text: {
            main: "#ffffff",
            alt: "#000000"
          },
          background: {
            main: "#000000",
          },
          primary: {
            main: "#8b15cb",
          },
          secondary: {
            main: "#13031c",
          },
          accent: {
            main: "#9117d3",
          },
        }),
  },
});

export { lightTheme, darkTheme, getDesignTokens };

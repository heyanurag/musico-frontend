import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RecoilRoot } from "recoil";
import App from "./App";

const defaultTheme = createTheme();

let theme = createTheme({
  palette: {
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#735bc1",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 10,
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

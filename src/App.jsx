import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LaunchPad from "./components/LaunchPad";
import Header from "./components/Header";

import { Box, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ color: "primary.main", height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<LaunchPad />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <p style={{ textAlign: "center" }}>There's nothing here!</p>
              </>
            }
          />
        </Routes>
      </Box>
    </>
  );
};

export default App;

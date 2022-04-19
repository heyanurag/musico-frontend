import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Home1 from "./components/Home1";
import LaunchPad from "./components/LaunchPad";
import { Box, CssBaseline } from "@mui/material";

import Header, { drawerWidth } from "./components/Header";
import "./css/App.css"

const App = () => {
  return (
    <Box sx={{ display: "flex", color: "primary.main", height: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: { xs: 6, sm: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<LaunchPad />} />
          <Route
            path="*"
            element={
              <>
                <p style={{ textAlign: "center" }}>There's nothing here!</p>
              </>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;

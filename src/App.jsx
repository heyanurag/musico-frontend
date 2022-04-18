import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LaunchPad from "./components/LaunchPad";
import Header, { drawerWidth } from "./components/Header";

import { Box, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ display: "flex", color: "primary.main", height: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
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

import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { useRecoilValue } from "recoil";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
// import LaunchPad from "./components/LaunchPad";
import Header, { drawerWidth } from "./components/Header";

import "./css/App.css";
import { user } from "./atoms";

const App = () => {
  const loggedInUser = useRecoilValue(user);

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
          {!loggedInUser ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              {/* <Route path="/app" element={<LaunchPad />} /> */}
              <Route
                path="*"
                element={
                  <>
                    <p style={{ textAlign: "center" }}>There's nothing here!</p>
                  </>
                }
              />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;

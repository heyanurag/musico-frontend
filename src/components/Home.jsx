import { Link } from "react-router-dom";
import Header from "./Header";

import { Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Home = () => {
  return (
    <>
      <Header />
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", pt: 3 }}
      >
        <Button
          color="secondary"
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          component={Link}
          to="/app"
        >
          Get Started
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          endIcon={<AppRegistrationIcon />}
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Stack>
    </>
  );
};

export default Home;

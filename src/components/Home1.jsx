import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Home = () => {
  return (
    <>
      <Typography align="center" variant="h2" gutterBottom pt={5}>
        Musico 🎶
      </Typography>
      <Typography align="center" gutterBottom>
        Explore Top Music Powered by your Scrobbles!
      </Typography>
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

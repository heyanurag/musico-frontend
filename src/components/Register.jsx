import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../atoms";
import Header from "./Header";
import Copyright from "./Copyright";

const Register = () => {
  const loggedIn = useRecoilValue(isLoggedIn);

  const [mood, setMood] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [moodError, setMoodError] = useState(false);

  const handleMoodChange = (event) => setMood(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    setNameError(false);
    setEmailError(false);
    setPassError(false);
    setMoodError(false);

    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get("email").trim(),
      password: data.get("password").trim(),
      name: data.get("Name").trim(),
      mood: data.get("mood").trim(),
    };

    let submit = true;

    //email validation
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email === "" || !emailRegex.test(formData.email)) {
      setEmailError(true);
      submit = false;
      console.log(formData.email);
    }

    //name validation
    if (
      formData.name === "" ||
      formData.name.length < 3 ||
      formData.name.length > 19 ||
      /\d/.test(formData.name)
    ) {
      setNameError(true);
      submit = false;
      console.log(formData.name);
    }

    //password validation
    if (formData.password === "" || formData.password.length < 6) {
      setPassError(true);
      submit = false;
      console.log(formData.password);
    }

    //mood validation
    if (formData.mood === "") {
      setMoodError(true);
      submit = false;
      console.log(formData.mood);
    }

    if (submit) {
      //PERFORM AXIOS POST HERE
      console.log(formData);
    }
  };

  if (loggedIn) {
    return <Navigate to="/app" state={{ from: "/" }} replace />;
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 0.5, bgcolor: "secondary.dark" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  error={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="emotion-select-label">Mood</InputLabel>
                  <Select
                    labelId="emotion-select-label"
                    id="emotion-select"
                    value={mood}
                    label="Eg. Happy"
                    name="mood"
                    onChange={handleMoodChange}
                    error={moodError}
                    required
                  >
                    <MenuItem value="Happy">Happy</MenuItem>
                    <MenuItem value="Sad">Sad</MenuItem>
                    <MenuItem value="Angry">Angry</MenuItem>
                    <MenuItem value="Anxious">Anxious</MenuItem>
                    <MenuItem value="Excited">Excited</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </>
  );
};

export default Register;

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../atoms";
import axiosInstance from "../axios";
import Copyright from "./Copyright";
import AlertDialog from "./AlertDialog";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const defaultMoods = ["angry", "happy", "neutral", "sad", "surprise"];

const Register = () => {
  const loggedInUser = useRecoilValue(user);
  const navigate = useNavigate();
  const [mood, setMood] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [moodError, setMoodError] = useState(false);

  //Snackbar
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  //AlertDialog
  const [openState, setOpenState] = useState(false);
  const openDialog = () => setOpenState(true);
  const closeDialog = () => {
    setOpenState(false);
    navigate("/login");
  };

  const handleMoodChange = (event) => setMood(event.target.value);

  const handleClose = () => setOpen(false);

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
      name: data.get("name").trim(),
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
    // if (formData.mood === "") {
    //   setMoodError(true);
    //   submit = false;
    //   console.log(formData.mood);
    // }

    if (submit) {
      //PERFORM AXIOS POST HERE
      console.log(formData);
      axiosInstance
        .post(`auth/register`, formData)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          openDialog();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            setTransition(() => TransitionLeft);
            setOpen(true);
          }
        });
    }
  };

  if (loggedInUser) {
    return <Navigate to="/app" state={{ from: "/" }} replace />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="name"
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
                  {defaultMoods.map((item) => (
                    <MenuItem
                      key={item}
                      value={item}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {item}
                    </MenuItem>
                  ))}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Invalid Registration Data! Please Try Again"
        key={"bottom center"}
      />
      <AlertDialog
        open={openState}
        closeDialog={closeDialog}
        title="Verify Email"
        description="An email verification link has been sent on the given email address.\nPlease verify your email to complete the account setup.\nVerification link is valid for 24 hrs"
      />
    </Container>
  );
};

export default Register;

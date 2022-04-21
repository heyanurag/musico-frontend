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
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import { useState } from "react";
import { user } from "../atoms";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Copyright from "./Copyright";
import axiosInstance from "../axios";
import { useSetRecoilState, useRecoilState } from "recoil";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const Login = () => {
  const setUser = useSetRecoilState(user);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [message, setMessage] = useState(
    "Invalid Login Credentials! Please Try Again"
  );

  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPassError(false);

    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get("email").trim(),
      password: data.get("password").trim(),
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

    //password validation
    if (formData.password === "" || formData.password.length < 6) {
      setPassError(true);
      submit = false;
      console.log(formData.password);
    }

    if (submit) {
      //PERFORM AXIOS POST HERE
      console.log(formData);
      axiosInstance
        .post(`auth/login`, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);

          localStorage.setItem(
            "access_token",
            res.data.user_data.tokens.access
          );
          localStorage.setItem(
            "refresh_token",
            res.data.user_data.tokens.refresh
          );

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");

          setUser({
            name: res.data.name,
            email: res.data.email,
            user_id: res.data.user_id,
            mood: res.data.mood,
          });

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response.status === 401 &&
            err.response.data.detail === "Invalid credentials, try again"
          ) {
            setTransition(() => TransitionLeft);
            setOpen(true);
          } else if (
            err.response.status === 401 &&
            err.response.data.detail === "Email is not verified"
          ) {
            setMessage("Please validate your email! Check your inbox");
            setTransition(() => TransitionLeft);
            setOpen(true);
          }
        });
    }
  };

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
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Register
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
        message={message}
        key={"bottom center"}
      />
    </Container>
  );
};

export default Login;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../../axios/axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#57CC99",
    },
    secondary: {
      main: "#57CC99",
    },
  },
});

export default function SigninForm() {
  const [name, setName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
    };
    if (data.name && data.email && data.password && data.phoneNumber) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired("");
      if (regName.test(data.name)) {
        setName(false);
        setNameError("");
        if (regEmail.test(data.email)) {
          setEmail(false);
          setEmailError("");
          if (regPhone.test(data.phoneNumber)) {
            setPhoneNumber(false);
            setPhoneNumberError("");
            if (data.phoneNumber.length === 10) {
              setPhoneNumber(false);
              setPhoneNumberError("");
              if (data.password.length >= 6) {
                setPassword(false);
                setPasswordError("");
                axios.post("/userSignup", data).then((response) => {
                  if (response.data.status === "success") {
                    navigate("/signin");
                  } else {
                    toast(response.data.message);
                  }
                });
              } else {
                setPassword(true);
                setPasswordError("Minimum 6 character");
              }
            } else {
              setPhoneNumber(true);
              setPhoneNumberError("Please enter 10 digit");
            }
          } else {
            setPhoneNumber(true);
            setPhoneNumberError("Please Enter valid Phone no");
          }
        } else {
          setEmail(true);
          setEmailError("Please enter valid Email");
        }
      } else {
        setname(true);
        setnameError("Please enter valid Name");
      }
    } else {
      setTotalRequired("Please enter your Details");
    }
    //   axios.post('/signup', data).then((response) => {
    //     if (response.data.status === 'success') {
    //       navigate('/login');
    //     } else {
    //       swal('OOPS', response.data.message, 'error');
    //     }
    //   });
    // };
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            borderColor: "secondary.main",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="./logo.png" width={200} alt="" />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <ToastContainer />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {totalRequired && (
              <Typography
                mb={0.5}
                sx={{ color: "red", fontFamily: "sans-serif" }}
                align="center"
              >
                {totalRequired}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              error={name}
              helperText={nameError}
              autoComplete="fullName"
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={email}
              helperText={emailError}
              autoComplete="email"
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone number"
              name="phoneNumber"
              error={phoneNumber}
              helperText={phoneNumberError}
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              error={password}
              helperText={passwordError}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="secondary"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container>
              
              <Grid item>
                <Link
                  onClick={() => navigate("/signin")}
                  variant="body2"
                  component="button"
                >
                  "Do you have an account? Sign in"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

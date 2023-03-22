import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  CssBaseline,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { useState } from "react";
import axios from "../../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../Store/Slice/AdminLogin";

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

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (data.email && data.password) {
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      if (regEmail.test(data.email)) {
        setEmail(false);
        setEmailError("");
        if (data.password.length >= 6) {
          setPassword(false);
          setPasswordError("");
        
          //* LOGIN FUNCTION HERE *//
          axios.post("admin/adminLogin", data).then((response) => {
          
            const admin = response.data.adminResult;
            if (!admin.Status) {
            
              toast(user.message);
            } else {
              localStorage.setItem("admintoken", admin.token);
              dispatch(
                setLogin({
                  user: "admin",
                  name: admin.name,
                  token: admin.token,
                })
              );
              navigate("/admin/doctors");
            }
          });
        } else {
          setPassword(true);
          setPasswordError("Minimum 6 character");
        }
      } else {
        setEmail(true);
        setEmailError("Please enter valid Email");
      }
    } else {
      setTotalRequired("All feilds are required");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <div>
          <img src="./logo.png" width={200} alt="" />
        </div> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Admin
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
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
              name="password"
              label="Password"
              type="password"
              error={password}
              helperText={passwordError}
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;

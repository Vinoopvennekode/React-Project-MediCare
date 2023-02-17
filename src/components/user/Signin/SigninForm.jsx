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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../Store/Slice/UserLogin";

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
          axios.post("/userLogin", data).then((response) => {
            console.log(response.data.userLogin);
            const user = response.data.userLogin;
            console.log(user.data);
            if (!user.Status) {
              console.log("okkkkkk");
              toast(user.message);
            } else {
              dispatch(
                setLogin({
                  user: "user",
                  name: user.name,
                  token: user.token,
                })
              );
              navigate("/");
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
          <img src="./logo.png" width={200} alt="" />
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
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => navigate("/signup")}
                  variant="body2"
                  component="button"
                >
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

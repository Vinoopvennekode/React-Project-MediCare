import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconBox = styled(Toolbar)({
  display: "flex",
  gap: "20px",
  align: "center",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#57CC99",
    },
  },
});

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    setcurrentUser(null);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color={"secondary"}>
          <StyledToolbar>
            <IconBox onClick={() => navigate("/")}>
              <img src="./logo2.png" width={"50px"} alt="" />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Medi care
              </Typography>
            </IconBox>

            <Button
              onClick={() => navigate("/docter/signin")}
              variant="outlined"
            >
              Login/Signup
            </Button>
          </StyledToolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;

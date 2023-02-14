import React from "react";
import Button from "@mui/material/Button";
import { AppBar, styled, Toolbar, Typography, Avatar } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const IconBox = styled(Toolbar)({
  display: "flex",
  gap: "20px",
  align: "center",
});

const UserBox = styled(Toolbar)({
  display: "flex",
  gap: "20px",
  align: "center",
});

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

const Header = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color={"secondary"}>
          <StyledToolbar>
            <IconBox>
              <AddAPhoto />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Medi care
              </Typography>
            </IconBox>
            <UserBox>
              <Avatar
                sx={{ width: "30px", height: "30px" }}
                src="https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
              />
              <Typography varient="span">vinoop</Typography>
            </UserBox>
          </StyledToolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;

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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AddAPhoto } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../Store/Slice/UserLogin";
import Profile from "../Profile/Profile";
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
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const { name } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (name) {
      setcurrentUser(name);
    } else {
      setcurrentUser(null);
    }
  }, []);

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
                sx={{ display: { xs: "none", sm: "block" } ,cursor: 'pointer'}}
              >
                Medi care
              </Typography>
            </IconBox>

            {currentUser ? (
              <div className="flex">
                <div
                  onClick={() => navigate("/notifications")}
                  class="relative mr-6 inline-flex w-fit cursor-pointer"
                >
                  {/* <div class="absolute top-0 right-0 bottom-auto left-auto z-10 inline-block translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-400 py-1 px-2 text-center align-baseline text-xs font-bold leading-none text-white">
                  99+
                </div> */}
                  <NotificationsIcon />
                </div>
                <UserBox onClick={(e) => setOpen(true)}>
                  <Avatar
                    sx={{ width: "30px", height: "30px" }}
                    src="https://w7..com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
                  />
                  <Typography varient="span">{currentUser}</Typography>
                </UserBox>
                <Menu
                  onClose={(e) => setOpen(false)}
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={open}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => setProfile(true)}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button onClick={() => navigate("/signin")} variant="outlined">
                  Login/Signup
                </Button>
              </div>
            )}
          </StyledToolbar>
        </AppBar>
      </ThemeProvider>
      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default Header;

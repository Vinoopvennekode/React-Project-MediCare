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

import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationModal from './Notification/NotificationModal'
import { setLogout } from "../../Store/Slice/DoctorLogin";
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
  const [open, setOpen] = useState(false);
  const[modalOn,setModalOn]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.doctorLogin);
  const [currentUser, setcurrentUser] = useState(null);

const ModalOpen=()=>{
  setModalOn(true)
}

useEffect(() => {
  if (name) {
    setcurrentUser(name);
  } else {
    setcurrentUser(null);
  }
}, []);
const handleLogout = () => {
  dispatch(setLogout());
  setcurrentUser(null)
  navigate("/doctor/signin")
};


  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color={"secondary"}>
          <StyledToolbar>
            <IconBox onClick={() => navigate("/doctor/home")}>
              <img src="/logo2.png" width={"50px"} alt="" />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Medi care
              </Typography>
            </IconBox>
            <UserBox>
              {/* <div onClick={()=>ModalOpen()} class="relative mx-3 inline-flex w-fit">
                <div class="absolute top-0 right-0 bottom-auto left-auto z-10 inline-block translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-400 py-1 px-2 text-center align-baseline text-xs font-bold leading-none text-white">
                  99+
                </div>
                <NotificationsIcon/>
              </div> */}
              <Typography onClick={(e) => setOpen(true)} varient="span">
                {name}
              </Typography>
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
              <MenuItem onClick={()=>navigate('/doctor/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout} >
                Logout
              </MenuItem>
            </Menu>
          </StyledToolbar>
        </AppBar>
      </ThemeProvider>
      {modalOn&&<NotificationModal setModalOn={setModalOn}/>}
    </div>
  );
};

export default Header;

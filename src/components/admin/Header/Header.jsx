import * as React from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Swal2 from 'sweetalert2';
import axios from "../../../axios/axios";
// import { adminDetails } from '../../../redux/admin';
import { setLogout } from "../../../Store/Slice/AdminLogin";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));





const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("admintoken");
    navigate("/admin");
    // setcurrentUser(null);
  };
  const { admin } = useSelector((state) => state.adminLogin);

  
    useEffect(() => {
      axios
      .get("/admin/isAdmin", {
        headers: { "a-access-token": localStorage.getItem("admintoken") },
      })
      .then((response) => {
        console.log("welcome");
        console.log(response.data);
        if (!response.data.auth) {
          navigate("/admin");
        } else {
          // dispatch(adminDetails(response.data));
        }
      });
    }, []);
    
 
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="absolute" open={open}>
    <Toolbar
      sx={{
        pr: "24px", // keep right padding when drawer closed
        bgcolor: "#57CC99",
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        MEDIcare ADMIN
      </Typography>
      <Typography variant="h6" noWrap component="div">
      {admin?.name}
        
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Header
import { styled, Box } from "@mui/material";


export const BannerContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "0px 0px",
    background: Colors.light_gray,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },

  }));
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import Dash from "../../components/admin/Dashboard/Dash";


const mdTheme = createTheme();
function Test() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Sidebar />
        <Dash />
      </Box>
    </ThemeProvider>
  );
}

export default Test;

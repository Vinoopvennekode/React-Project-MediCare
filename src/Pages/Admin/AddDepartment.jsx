
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import Department from "../../components/admin/Departments/AddDepartment";

const mdTheme = createTheme();


function AddDepartment() {
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Department />
    </Box>
  </ThemeProvider>
  )
}

export default AddDepartment
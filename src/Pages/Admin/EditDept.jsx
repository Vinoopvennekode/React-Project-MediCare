
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import Department from "../../components/admin/Departments/EditDepartment";

const mdTheme = createTheme();


function EditDepartment() {
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

export default EditDepartment
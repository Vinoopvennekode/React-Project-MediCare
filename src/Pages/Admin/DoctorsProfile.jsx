
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import DoctorProfilepage from "../../components/admin/Doctors/DoctorsProfileMain";

const mdTheme = createTheme();


function DoctorProfile() {
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <DoctorProfilepage />
    </Box>
  </ThemeProvider>
  )
}

export default DoctorProfile
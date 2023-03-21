
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import AppoinmentsTable from "../../components/admin/Appoinments/Appoinments";

const mdTheme = createTheme();


function Doctors() {
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <AppoinmentsTable />
    </Box>
  </ThemeProvider>
  )
}

export default Doctors
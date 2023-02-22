import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import Doctorstable from "../../components/admin/Docters/DoctorsPending";

const mdTheme = createTheme();

function DoctersPending() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Sidebar />
        <Doctorstable />
      </Box>
    </ThemeProvider>
  );
}

export default DoctersPending;

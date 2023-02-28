
import * as React from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
import DocterProfilepage from "../../components/admin/Docters/DoctersProfileMain";

const mdTheme = createTheme();


function DocterProfile() {
  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <DocterProfilepage />
    </Box>
  </ThemeProvider>
  )
}

export default DocterProfile
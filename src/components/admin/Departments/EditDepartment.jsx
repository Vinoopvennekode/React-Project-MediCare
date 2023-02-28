import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Form from "../Departments/EditDepartmentForm";

function EditDepartment() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: () =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Form />
    </Box>
  );
}

export default EditDepartment;

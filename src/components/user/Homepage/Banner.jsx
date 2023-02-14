import { Box, Grid, Typography,Button } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#80ED99" }}>
      <Grid container>
        <Grid xs={6}  >
          <Box  >
            <Typography variant="h6" align="center" pt={20}>
              Consult India’s Top Doctors Online,
            </Typography>
            <Typography variant="h4" align="center">
              Safely From Home.
            </Typography>
            <Button  variant="contained">Contained</Button>
          </Box>
        </Grid>
        <Grid xs={6}  >
          <Box  sx={{ display: { xs: "none", sm: "block" } }} >
            <img src="/banner-doctors.png" width={500}alt="" />
          </Box>
          <Box  sx={{ display: { xs: "block", sm: "none" } }} pt={5} >
            <img src="/banner2.png" width={200} alt="" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;

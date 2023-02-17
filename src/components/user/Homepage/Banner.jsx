import { Box, Grid, Typography,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const Banner = () => {
  const navigate=useNavigate()
  return (
    <Box sx={{ width: "100%", backgroundColor: "#80ED99",marginTop:"55px" }}>
      <Grid container>
        <Grid xs={12} sm={6} >
          <Box align="center" >
          <Box  sx={{ display: { xs: "block", sm: "none" } }} pt={5} >
            <img src="/banner2.png" width={200} alt="" />
          </Box>
            <Typography variant="h6" align="center"  sx={{pt:{xs:0,sm:15,md:15}}} >
              Consult India’s Top Doctors Online,
            </Typography>
            <Typography variant="h4" align="center">
              Safely From Home.
            </Typography>
            <Button sx={{marginTop:"20px"}} onClick={() => navigate("/docterList")} color="success" variant="contained">Find docter</Button>
          </Box>
        </Grid>
        <Grid xs={12} sm={6} >
          <Box  sx={{ display: { xs: "none", sm: "block" } }} >
            <img src="/banner-doctors.png" width={500}alt="" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;

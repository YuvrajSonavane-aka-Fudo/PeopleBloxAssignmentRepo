import { AppBar, Grid } from "@mui/material";
import React from "react";
import Peopleblox from "/public/peopleblox.svg";
import Image from "next/image";

const NavBar = () => {
  return (
    <AppBar sx={{ p: "1rem 3rem", height: "5rem", bgcolor: "#000000" }}>
      <Grid container alignItems={"center"}>
        <Grid size={{ xs: 12 }} textAlign={"center"}>
          <Image src={Peopleblox} alt="Peopleblox" height={50} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavBar;

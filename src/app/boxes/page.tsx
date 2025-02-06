import React from "react";
import { Grid2 } from "@mui/material";
import BoxList from "@/app/components/boxes/BoxList";

export default function Box() {
  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        <BoxList />
      </Grid2>
    </React.Fragment>
  );
}

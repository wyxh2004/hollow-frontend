// import styles from "./page.module.css";
import BoxList from "@/app/components/boxes/BoxList";
// import RootLayout from "./layout";
import { Grid2 } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        <BoxList />
      </Grid2>
    </React.Fragment>
  );
}

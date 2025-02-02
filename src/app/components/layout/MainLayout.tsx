"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
import { Container, Box, Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <React.Fragment>
      <Header />
      <Container fixed>
        <Box sx={{ bgcolor: " ", height: "95vh" }}>{children}</Box>
        <Fab
          variant="extended"
          style={{
            position: "fixed",
            display: "flex",
            right: "20px",
            left: "auto",
            bottom: "20px",
            backgroundColor: "#3f51b5",
          }}
          onClick={scrollToTop}
        >
          <NavigationIcon />
        </Fab>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
import { Box, Fab } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: "64px", // 这个值需要和Header的高度相同
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {children}
      </Box>
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
      <Footer />
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { Hero } from "../components/LandingPage/Hero";
import { Promo } from "../components/LandingPage/Promo";
import { About } from "../components/LandingPage/About";
import { Why } from "../components/LandingPage/Why";

export function LandingPage() {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbarState({ open: false, message: "", severity: "info" });
  };

  return (
    <Box>
      <Hero />
      <Promo />
      <About />
      <Why />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        key={Date.now()}
        autoHideDuration={6000}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { getAllProducts } from "../api/product";
import { Hero } from "../components/LandingPage/Hero";

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

export async function loader() {
  try {
    const products = await getAllProducts();
    return { products };
  } catch (error) {
    //TODO: handle error
    console.log(error);
    throw error;
  }
}

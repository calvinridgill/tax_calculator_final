import React from "react";
import { useRouteError } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export function ErrorPage() {
  const error = useRouteError();
  const errorMessage = error.response?.data.message || error.message;
  console.log("idid", error);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ color: "error.main" }}>
        Oops!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
        We apologize for the inconvenience. Please try again later.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        {errorMessage || "Something went wrong"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </Container>
  );
}

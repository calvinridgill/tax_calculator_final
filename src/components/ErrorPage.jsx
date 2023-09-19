import React from "react";
import PropTypes from "prop-types";
import { useRouteError, useAsyncError } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export function ErrorPage({ sxStyle }) {
  let error = useRouteError();
  if (!error) error = useAsyncError();
  let errorMessage = error?.response?.data.message; // error from axios
  console.log("error", error);
  if (!errorMessage) errorMessage = error.message;
  if (error?.statusText === "Not Found") errorMessage = "Page not found";

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        ...sxStyle,
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

ErrorPage.propTypes = {
  sxStyle: PropTypes.object,
};

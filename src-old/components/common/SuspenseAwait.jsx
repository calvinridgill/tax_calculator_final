import React from "react";
import PropTypes from "prop-types";
import { Await } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ErrorPage } from "../ErrorPage";

export function SuspenseAwait({
  resolve,
  errorElement,
  children,
  fallbackElement,
}) {
  return (
    <React.Suspense
      fallback={fallbackElement ? fallbackElement : <CustomCircularProgress />}
    >
      <Await
        resolve={resolve}
        errorElement={errorElement ? errorElement : <ErrorPage />}
      >
        {children}
      </Await>
    </React.Suspense>
  );
}

const CustomCircularProgress = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      py: 10,
    }}
  >
    <CircularProgress />
  </Box>
);

SuspenseAwait.propTypes = {
  resolve: PropTypes.any.isRequired,
  errorElement: PropTypes.element,
  children: PropTypes.func,
  fallbackElement: PropTypes.element,
};

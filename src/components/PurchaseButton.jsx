import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFetcher } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import { CustomButton } from "./common/CustomButton";
import { makePayment } from "../api/payment";
import { getAllProducts } from "../api/product";

export function PurchaseButton({ children, ...others }) {
  const fetcher = useFetcher();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setSnackbarState({
        open: true,
        message: "Processing your order..",
        severity: "info",
      });
    } else if (fetcher.data instanceof Error) {
      setSnackbarState({
        open: true,
        message: "Error while processing your order",
        severity: "error",
      });
    }
  }, [fetcher]);

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbarState({ open: false, message: "", severity: "info" });
  };

  return (
    <Box>
      <fetcher.Form method="post" action="/purchase">
        <CustomButton
          type="submit"
          variant="outlined"
          disabled={fetcher.state === "submitting"}
          {...others}
        >
          {children}
        </CustomButton>
      </fetcher.Form>
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

PurchaseButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export const action = async ({ params }) => {
  try {
    let productId = params.productId;
    if (!productId) {
      const products = await getAllProducts();
      if (!products || products.length === 0)
        return new Error("No products found");
      productId = products[0]._id;
    }
    const redirectURL = await makePayment(productId);
    window.location.href = redirectURL;
    return null;
  } catch (error) {
    return error;
  }
};

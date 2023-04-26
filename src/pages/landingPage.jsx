import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getAllProducts } from "../api/product";

export function LandingPage() {
  const fetcher = useFetcher();
  const { products } = useLoaderData();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  React.useEffect(() => {
    if (fetcher.state === "submitting") {
      setSnackbarState({
        open: true,
        message: "Processing purchasing...",
        severity: "info",
      });
    } else if (fetcher.data instanceof Error) {
      setSnackbarState({
        open: true,
        message: "Error while processing your purchase",
        severity: "error",
      });
    }
  }, [fetcher]);

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbarState({ open: false, message: "", severity: "info" });
  };

  return (
    <Box sx={{ pt: 5 }}>
      <Container sx={{ display: "flex", gap: 5 }}>
        {products.map((product) => (
          <Card sx={{ maxWidth: 400 }} key={product._id}>
            <CardMedia
              sx={{ height: 160 }}
              image={product.images[0]}
              title="Tax Return"
            />
            <CardContent>
              <Typography variant="h6" textAlign={"center"}>
                {product.name}
              </Typography>
              <Typography textAlign={"center"}>
                {product.description}
              </Typography>
              <Typography sx={{ pt: 2 }} textAlign={"center"}>
                ${product.price / 100} per access
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <fetcher.Form method="post" action="/purchase/productId">
                  <input
                    hidden
                    readOnly
                    name="productId"
                    value={product._id} // took this from the database
                  />
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={fetcher.state === "submitting"}
                  >
                    Get Yours
                  </Button>
                </fetcher.Form>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Container>
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

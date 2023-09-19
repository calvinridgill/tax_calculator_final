import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { getAllProducts } from "../../api/product";
import { Navigate, useLoaderData, defer } from "react-router-dom";
import { EditProductDialog } from "./EditProductDialog";
import { SuspenseAwait } from "../common/SuspenseAwait";
// import { useAlert } from "../../context/AlertProvider";

export function ProductDashboard() {
  const { products } = useLoaderData();
  // const alert = useAlert();

  const [openEditProductDialog, setOpenProductDialog] = useState(false);

  return (
    <SuspenseAwait resolve={products}>
      {(products) => {
        if (products?.length === 0 || !products)
          return <Navigate to="/dashboard/product/create" replace={true} />;

        return (
          <Box sx={{ pt: 3 }}>
            <Paper sx={{ p: 2, maxWidth: 500 }}>
              <Box
                sx={{
                  bgcolor: "whitesmoke",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                <Box
                  component={"img"}
                  src={products[0].images[0]}
                  sx={{
                    height: 250,
                    bgcolor: "whitesmoke",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                {products[0].name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ marginBottom: 1.5 }}
              >
                {products[0].description}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginBottom: 1 }}
              >
                ${products[0].price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                onClick={() => {
                  setOpenProductDialog(true);
                }}
              >
                Edit
              </Button>
            </Paper>
            <EditProductDialog
              isOpen={openEditProductDialog}
              onClose={() => {
                setOpenProductDialog(false);
              }}
              product={products[0]}
            />
          </Box>
        );
      }}
    </SuspenseAwait>
  );
}

export async function loader() {
  try {
    return defer({ products: getAllProducts() });
  } catch (error) {
    return { error: "Error while fetching products" };
  }
}

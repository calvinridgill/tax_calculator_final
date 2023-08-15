import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { getAllProducts } from "../../api/product";
import { Navigate, useLoaderData } from "react-router-dom";
import { EditProductDialog } from "./EditProductDialog";
// import { useAlert } from "../../context/AlertProvider";

export function ProductDashboard() {
  const loaderData = useLoaderData();
  // const alert = useAlert();

  const [openEditProductDialog, setOpenProductDialog] = useState(false);

  if (loaderData.products?.length === 0 || !loaderData.products)
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
            src={loaderData.products[0].images[0]}
            sx={{
              height: 250,
              bgcolor: "whitesmoke",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
          {loaderData.products[0].name}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginBottom: 1.5 }}
        >
          {loaderData.products[0].description}
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
          ${loaderData.products[0].price}
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
        product={loaderData.products[0]}
      />
    </Box>
  );
}

export async function loader() {
  try {
    const products = await getAllProducts();
    return { products };
  } catch (error) {
    return { error: "Error while fetching products" };
  }
}

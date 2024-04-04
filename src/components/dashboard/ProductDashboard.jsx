import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { getAllProducts } from "../../api/product";
import { Navigate, useLoaderData, defer } from "react-router-dom";
import { EditProductDialog } from "./EditProductDialog";
import { SuspenseAwait } from "../common/SuspenseAwait";
// import { useAlert } from "../../context/AlertProvider";
import "./CreateEditProduct.css";

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
              <h1 className="text-center1">Product Details</h1>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b>Name :</b>
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  {products[0].name}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b> Description :</b>
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ marginBottom: 1.5 }}
                >
                  {products[0].description}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b> Gross Income :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].income}
                </Typography>
              </div>
              <h3 className="text-center mt-2">Other Expenses</h3>

              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Gas :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].gas}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Supplies :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].supplies}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Cell Phone :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].cell_phone}
                </Typography>
              </div>

              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Auto insurance :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].auto_insurance}
                </Typography>
              </div>

              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Office expense :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].office_expense}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> All other expenses :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].other_expenses}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Commissions and fees :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].commissions_fees}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Auto lease or note payment :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].auto_lease_note_payment}
                </Typography>
              </div>

              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Auto Repairs and maintenance :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].auto_repairs_maintenance}
                </Typography>
              </div>
              <div className="section1">
                <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                  <b className="b"> Legal and professional services :</b>
                </Typography>
                <Typography variant="h6" fontWeight="" sx={{ marginBottom: 1 }}>
                  ${products[0].legal_professional_services}
                </Typography>
              </div>
              <section className="sectionData">
                <div className="section1">
                  <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                    <b> Total Expenses :</b>
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight=""
                    sx={{ marginBottom: 1 }}
                  >
                    <b>${products[0].totalExpenses}</b>
                  </Typography>
                </div>
                <div className="section1">
                  <Typography variant="h5" sx={{ marginBottom: 1.5 }}>
                    <b> Total Income :</b>
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight=""
                    sx={{ marginBottom: 1 }}
                  >
                    <b>${products[0].netIncome}</b>
                  </Typography>
                </div>
              </section>
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

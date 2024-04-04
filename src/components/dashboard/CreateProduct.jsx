import React from "react";
import { Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { createProduct } from "../../api/product";
import { Form, redirect, useNavigation } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
import "./CreateEditProduct.css";
// import { useAlert } from "../../context/AlertProvider";

export const CreateProduct = () => {
  const navigation = useNavigation();
  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h5">
        No product Found, Create your product
      </Typography>
      <Form method="post" encType="multipart/form-data">
        <CreateEditProduct disabled={navigation.state === "submitting"} />
        <Button
          type="submit"
          variant="contained"
          disabled={navigation.state === "submitting"}
        >
          Create Product
        </Button>
      </Form>
    </Box>
  );
};

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const income = formData.get("income");
    const cell_phone = formData.get("cell_phone");
    const gas = formData.get("gas");
    const auto_repairs_maintenance = formData.get("auto_repairs_maintenance");
    const commissions_fees = formData.get("commissions_fees");
    const auto_insurance = formData.get("auto_insurance");
    const legal_professional_services = formData.get("legal_professional_services");
    const office_expense = formData.get("office_expense");
    const other_expenses = formData.get("other_expenses");
    const supplies = formData.get("supplies");
    const auto_lease_note_payment = formData.get("auto_lease_note_payment");
    const extraIncome = formData.get("extraIncome");
    const tax = formData.get("tax");
   


    await createProduct({ name, description, income, cell_phone, gas, auto_repairs_maintenance, commissions_fees, auto_insurance, legal_professional_services , office_expense, other_expenses,supplies, auto_lease_note_payment,extraIncome,tax});
    return redirect("/dashboard/product");
  } catch (error) {
    return { error: "Error while creating product" };
  }
}

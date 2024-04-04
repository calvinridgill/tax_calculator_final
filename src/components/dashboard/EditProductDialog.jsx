import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { CreateEditProduct } from "./CreateEditProduct";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { editProduct, deleteProduct } from "../../api/product";
import { useFetcher, redirect } from "react-router-dom";

export function EditProductDialog({ isOpen, onClose, product }) {
  const deleteFetcher = useFetcher();
  const editProductFetcher = useFetcher();
  const disabled =
    editProductFetcher.state === "submitting" ||
    editProductFetcher.state === "loading" ||
    deleteFetcher.state === "submitting" ||
    deleteFetcher.state === "loading";

  React.useEffect(() => {
    if (editProductFetcher.state === "idle") onClose();
  }, [editProductFetcher.state]);

  React.useEffect(() => {
    if (deleteFetcher.state === "idle") onClose();
  }, [deleteFetcher.state]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <editProductFetcher.Form method="post" encType="multipart/form-data">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <input readOnly hidden name="product_id" value={product._id} />
          <CreateEditProduct defaultValues={product} disabled={disabled} />
          <DialogActions>
            <Button onClick={onClose} disabled={disabled}>
              Back
            </Button>
            <Button
              color="error"
              variant="contained"
              disabled={disabled}
              onClick={() => {
                deleteFetcher.submit(
                  { idle: true },
                  {
                    method: "post",
                    action: `/dashboard/product/destroy?product_id=${product._id}`,
                  }
                );
              }}
            >
              Delete
            </Button>
            <Button type="submit" variant="contained" disabled={disabled}>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </editProductFetcher.Form>
    </Dialog>
  );
}

EditProductDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
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


    const productId = formData.get("product_id");
    await editProduct(productId, {
      name,
      description,
      income,
      cell_phone,
      gas,
      auto_repairs_maintenance,
      commissions_fees,
      auto_insurance,
      legal_professional_services,
      office_expense,
      other_expenses,
      supplies,
      auto_lease_note_payment,
      extraIncome,
      tax
    });

    return { closeDialog: true };
  } catch (error) {
    return { error: "Error while creating product" };
  }
}

export async function deleteProductAction({ request }) {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("product_id");
    await deleteProduct(productId);
  } catch (error) {
    return { error: "Error while deleting product" };
  }
  return redirect("/dashboard/product");
}

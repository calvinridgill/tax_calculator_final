import React from "react";
import { Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { createProduct } from "../../api/product";
import { Form, redirect, useNavigation } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
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
    const price = formData.get("price");
    const image = formData.get("image");
    await createProduct({ name, description, price, image });
    return redirect("/dashboard/product");
  } catch (error) {
    return { error: "Error while creating product" };
  }
}

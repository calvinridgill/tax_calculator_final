import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Form, redirect } from "react-router-dom";
import { createConfig } from "../../api/config";
import { ConfigFormFields, configFields } from "./ConfigFormFields";

export function CreateConfig() {
  return (
    <Container maxWidth="md" sx={{ pt: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Create Config
      </Typography>
      <Form method="post">
        <ConfigFormFields />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "100%", mt: 5 }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  let data = {};
  configFields.forEach((field) => {
    data[field] = formData.get(field);
  });
  data.NODE_ENV = import.meta.env.MODE;
  console.log("idid", "data", data);
  await createConfig(data);
  return redirect("/dashboard/config");
}

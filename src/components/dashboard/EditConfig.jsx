import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Form, redirect, useLoaderData, Navigate } from "react-router-dom";
import { updateConfig } from "../../api/config";
import { ConfigFormFields, configFields } from "./ConfigFormFields";
import { SuspenseAwait } from "../common/SuspenseAwait";

export function EditConfig() {
  const { configs } = useLoaderData();

  return (
    <SuspenseAwait resolve={configs}>
      {(configs) => {
        if (!configs || configs?.length === 0)
          return <Navigate to={"create"} />;

        const myEnvConfig = configs.find(
          (config) => config.NODE_ENV === import.meta.env.MODE
        );

        return (
          <Container maxWidth="md" sx={{ pt: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Edit Config
            </Typography>
            <Form method="post">
              <ConfigFormFields defaultValues={myEnvConfig} />
              <input readOnly type="hidden" name="id" value={myEnvConfig._id} />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: "100%", mt: 5 }}
              >
                Update
              </Button>
            </Form>
          </Container>
        );
      }}
    </SuspenseAwait>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  let data = {};
  configFields.forEach((field) => {
    data[field] = formData.get(field);
  });
  data.NODE_ENV = import.meta.env.MODE;
  await updateConfig(data, formData.get("id"));
  return redirect("/dashboard/config");
}

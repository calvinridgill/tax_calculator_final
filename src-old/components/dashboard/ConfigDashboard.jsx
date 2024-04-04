import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { SuspenseAwait } from "../common/SuspenseAwait";
import { useLoaderData, defer, Navigate } from "react-router-dom";
import { getConfig } from "../../api/config";
import { ConfigFormFields } from "./ConfigFormFields";

export function ConfigDashboard() {
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
          <Box sx={{ pt: 3 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
              Configs
            </Typography>

            <ConfigFormFields defaultValues={myEnvConfig} readOnly />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "120px", mt: 5 }}
              href="/dashboard/config/edit"
            >
              Edit
            </Button>
          </Box>
        );
      }}
    </SuspenseAwait>
  );
}

export async function loader() {
  try {
    const configsData = getConfig();
    return defer({ configs: configsData });
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching configuration");
  }
}

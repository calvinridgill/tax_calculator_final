import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";

export const configFields = [
  "CALVIN_NAME",
  "ORIGINAL_SPREADSHEET_ID",
  "COMPANY_NAME",
  "STRIPE_API_KEY",
  "STRIPE_END_POINT_SECRET",
  "EMAIL_FROM",
  "SERVICE_ACCOUNT_EMAIL",
  "SENDGRID_USERNAME",
  "SENDGRID_PASSWORD",
  "SERVER_URL",
  "CLIENT_APP_URL",
];

export function ConfigFormFields({ defaultValues, readOnly = false }) {
  return (
    <Grid container spacing={3}>
      {configFields.map((field) => (
        <Grid item xs={12} sm={6} md={4} key={field}>
          <TextField
            fullWidth
            required
            id={field}
            name={field}
            label={field.replace(/_/g, " ")}
            variant="outlined"
            defaultValue={defaultValues ? defaultValues[field] : ""}
            sx={{ width: "100%" }}
            inputProps={{ readOnly: readOnly, hidden: !field }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

ConfigFormFields.propTypes = {
  defaultValues: PropTypes.object,
  readOnly: PropTypes.bool,
};

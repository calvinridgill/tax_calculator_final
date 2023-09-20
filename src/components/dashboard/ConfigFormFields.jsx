import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";

export const configFields = [
  "CALVIN_NAME",
  "ORIGINAL_SPREADSHEET_ID",
  "COMPANY_NAME",
  "STRIPE_API_KEY",
  "STRIPE_END_POINT_SECRET",
  "SENDGRID_PASSWORD",
  "SENDGRID_USERNAME",
  "SERVER_URL",
  "CLIENT_APP_URL",
  "EMAIL_FROM",
  "DB_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_COOKIE_EXPIRES_IN",
];

export function ConfigFormFields({ defaultValues, readOnly = false }) {
  return (
    <Grid container spacing={3}>
      {configFields.map((field) => (
        <Grid item xs={12} sm={6} md={4} key={field}>
          <TextField
            fullWidth
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

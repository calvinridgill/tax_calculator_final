import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ConfigCreatePage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your logic for submitting the form to the server
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Dashboard Config Create Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {[
            "NODE_ENV",
            "EMAIL_FROM",
            "CLIENT_APP_URL",
            "SERVER_URL",
            "ORIGINAL_SPREADSHEET_ID",
            "CALVIN_NAME",
            "SENDGRID_PASSWORD",
            "SENDGRID_USERNAME",
            "COMPANY_NAME",
            "STRIPE_API_KEY",
            "STRIPE_END_POINT_SECRET",
          ].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <TextField
                fullWidth
                required
                id={field}
                name={field}
                label={field}
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ConfigCreatePage;

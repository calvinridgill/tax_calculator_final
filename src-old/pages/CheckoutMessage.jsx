import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export function CheckoutMessage() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const isCheckoutSuccessful = params.get("success") === "true";

  if (isCheckoutSuccessful) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <CheckoutConfirmation />
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <FailedCheckout />
        </Box>
      </Container>
    );
  }
}

const CheckoutConfirmation = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CheckCircleOutlineIcon
            color="primary"
            fontSize="inherit"
            sx={{ fontSize: 50 }}
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          Order Placed Successfully
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your order has been successfully placed.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          An email containing your login credentials has been sent to your
          inbox.
        </Typography>
      </CardContent>
    </Card>
  );
};

const FailedCheckout = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CancelOutlinedIcon
            color="error"
            fontSize="inherit"
            sx={{ fontSize: 50 }}
          />
        </Box>
        <Typography variant="h5" gutterBottom>
          Checkout Failed
        </Typography>
        <Typography variant="body1" gutterBottom>
          {"    We're sorry, but there was an issue with your checkout."}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please review your information and try again.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          fullWidth
          sx={{ mt: 2 }}
        >
          Retry Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

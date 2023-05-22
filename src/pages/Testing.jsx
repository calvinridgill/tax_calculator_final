import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CheckoutConfirmation = () => {
  return (
    <Card>
      <CardContent>
        <CheckCircleOutlineIcon color="primary" fontSize="large" />
        <Typography variant="h5" gutterBottom>
          Order Placed Successfully
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body2" gutterBottom>
          {" Your order has been successfully placed. We'll process it soon."}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Order Number: 123456789
        </Typography>
        <Typography variant="body2" color="textSecondary">
          An email confirmation has been sent to you.
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
};

export default CheckoutConfirmation;

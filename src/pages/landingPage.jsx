import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";

export function LandingPage() {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });
  const handlePurchase = async () => {
    console.log(
      "processing your purchase",
      " add a snack bar showing it is processing the purchase"
    );
    setSnackbarState({ open: true, message: "Processing purchasing..." });
  };
  return (
    <Box sx={{ pt: 5 }}>
      <Container>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 160 }}
            image="https://images.unsplash.com/photo-1598432439250-0330f9130e14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
            title="Tax Return"
          />
          <CardContent>
            <Typography variant="h6" textAlign={"center"}>
              Tax Preparation Spreadsheet
            </Typography>
            <Typography textAlign={"center"}>
              Introducing the Tax Preparation Spreadsheet designed for
              individuals, a comprehensive tool to help you manage ...
            </Typography>
            <Typography sx={{ pt: 2 }} textAlign={"center"}>
              $20.00 per access
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <Button variant="outlined" onClick={handlePurchase}>
                Get Yours
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarState.open}
        onClose={() => setSnackbarState({ open: false, message: "" })}
        message={snackbarState.message}
        key={Date.now()}
      />
    </Box>
  );
}

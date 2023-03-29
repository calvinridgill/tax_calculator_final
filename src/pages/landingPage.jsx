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
  Alert,
} from "@mui/material";
import { useFetcher } from "react-router-dom";

export function LandingPage() {
  const fetcher = useFetcher();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  React.useEffect(() => {
    if (fetcher.state === "submitting") {
      setSnackbarState({
        open: true,
        message: "Processing purchasing...",
        severity: "info",
      });
    } else if (fetcher.data instanceof Error) {
      setSnackbarState({
        open: true,
        message: "Error while processing your purchase",
        severity: "error",
      });
    }
  }, [fetcher]);

  const handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") return;
    setSnackbarState({ open: false, message: "", severity: "info" });
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
              <fetcher.Form method="post" action="/purchase/priceId">
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={fetcher.state === "submitting"}
                >
                  Get Yours
                </Button>
              </fetcher.Form>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarState.open}
        onClose={handleSnackbarClose}
        key={Date.now()}
        autoHideDuration={6000}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

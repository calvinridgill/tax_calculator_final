import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { axios } from "../utils/axios";

export const TaxCalculator = () => {
  const [spreadSheetUrl, setSpreadSheetUrl] = React.useState(null);
  const [error, setError] = React.useState(null);
  const auth = useAuth();
  React.useEffect(() => {
    // get the user order
    try {
      axios.get(`/order/user/${auth.user._id}`).then(({ data }) => {
        if (data.data.orders.length !== 0) {
          const url = data.data.orders[0].spreadSheetUrl;
          const parts = url.split("#");
          const newUrl = parts[0] + "?rm=minimal#" + parts[1];
          setSpreadSheetUrl(newUrl);
        } else setError("No order found");
      });
    } catch (error) {
      console.log("idid", "error--->", error);
      setSpreadSheetUrl(null);
      setError(error);
    }
  }, [auth.user._id]);

  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography variant="h4" component="h1">
          Something went wrong
        </Typography>
      </Box>
    );

  if (!spreadSheetUrl)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "100vw",
            height: "93vh",
          }}
        >
          <iframe src={spreadSheetUrl} width="100%" height="100%" />
        </Box>
      </Box>
    </>
  );
};

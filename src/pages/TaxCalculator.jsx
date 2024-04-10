import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { axios } from "../utils/axios";
import { SpreadSheetSkeleton } from "../components/SpreadSheetSkeleton";
import { Navigate } from "react-router-dom";

export const TaxCalculator = () => {
  const [spreadSheetUrl, setSpreadSheetUrl] = useState(null);
  const [googleSheetLoading, setGoogleSheetLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/order/user/${auth.user._id}`);
        const { data } = response.data;
        if (data.orders.length !== 0) {
          const url = data.orders[0].spreadSheetUrl;
          if (url) {
            const parts = url.split("#");
            const newUrl = parts[0] + "?rm=minimal#" + parts[1];
            setSpreadSheetUrl(newUrl);
          } else {
            setError("No spreadsheet URL found");
          }
        } else {
          setError("No orders found for the user");
        }
      } catch (error) {
        console.log("Error fetching order:", error);
        setError("Error fetching order");
      } finally {
        setGoogleSheetLoading(false); // Ensure loading indicator is turned off
      }
    };

    if (auth.user && auth.user._id) {
      fetchOrder();
    }
  }, [auth.user]);

  if (auth.user.role === "admin") return <Navigate to="/dashboard/product" />;

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography variant="h4" component="h1">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!spreadSheetUrl && !googleSheetLoading) return <SpreadSheetSkeleton />;

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "100vw",
            height: "93vh",
          }}
        >
          <iframe
            onLoad={() => {
              setGoogleSheetLoading(false);
            }}
            src={spreadSheetUrl}
            width="80%"
            height="80%"
          />
        </Box>
      </Box>
    </>
  );
};
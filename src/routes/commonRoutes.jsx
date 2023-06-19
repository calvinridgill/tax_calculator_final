import React from "react";
import { Outlet, Route } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { LandingPage, loader as landingPageLoader } from "../pages/landingPage";
import { TaxPrepTool } from "../pages/TaxPrepTool";
import { action as purchaseProductAction } from "../components/PurchaseButton";
import { CheckoutMessage } from "../pages/CheckoutMessage";
import { LoggedOutHeader } from "../components/LandingPage/LoggedOutHeader";
import { Footer } from "../components/LandingPage/Footer";
import { Box } from "@mui/material";
import { AboutDetail, loader as aboutDetailLoader } from "../pages/AboutDetail";
import { action as contactUsAction } from "../components/ContactUs";

export const commonRoutes = (
  <Route>
    <Route
      element={
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Box sx={{ flex: 1 }}>
            <LoggedOutHeader />
            <Outlet />
          </Box>
          <Box sx={{ mt: "auto" }}>
            <Footer />
          </Box>
        </Box>
      }
    >
      <Route path="/" element={<LandingPage />} loader={landingPageLoader} />
      <Route
        path="/about/:title"
        element={<AboutDetail />}
        loader={aboutDetailLoader}
      />
      <Route path="/tax-prep-tool" element={<TaxPrepTool />} />
    </Route>
    <Route
      element={
        <>
          <AppBar />
          <Outlet />
        </>
      }
    >
      <Route path="/purchase/:productId?" action={purchaseProductAction} />
      <Route path="/checkout" element={<CheckoutMessage />} />
    </Route>
    <Route path="/ask_help" action={contactUsAction} />
  </Route>
);

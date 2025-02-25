import React from "react";
import { Outlet, Route } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { LandingPage } from "../pages/landingPage";
import { TaxPrepTool } from "../pages/TaxPrepTool";
import { action as purchaseProductAction } from "../components/PurchaseButton";
import { CheckoutMessage } from "../pages/CheckoutMessage";
import { LoggedOutHeader } from "../components/LandingPage/LoggedOutHeader";
import { Footer } from "../components/LandingPage/Footer";
import { Box } from "@mui/material";
import { AboutDetail, loader as aboutDetailLoader } from "../pages/AboutDetail";
import { action as contactUsAction } from "../components/ContactUs";
import Testing from "../pages/Testing";
import MerchantPolicies from "../pages/MerchantPolicies";
import TermsandCondition from "../pages/TermsandCondition";
import Refundpolicy from "../pages/Refundpolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import LegalNotice from "../pages/LegalNotice";

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
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/about/:title"
        element={<AboutDetail />}
        loader={aboutDetailLoader}
      />
      <Route path="/tax-prep-tool" element={<TaxPrepTool />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/merchant-policies" element={<MerchantPolicies />} />
      <Route path="/terms-and-conditions" element={<TermsandCondition />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/return-and-refund-policy" element={<Refundpolicy />} />
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
    <Route path="/testing" element={<Testing />} />
  </Route>
);

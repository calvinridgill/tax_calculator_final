import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { AppBar } from "../components/AppBar";
import { Box } from "@mui/material";
import { TaxCalculator } from "../pages/TaxCalculator";
import { RestrictedTo } from "./routeUtils";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { DashboardNavigationPanel } from "../components/dashboard/DashboardNavigationPanel";
import {
  MessageDashboard,
  loader as messageLoader,
} from "../components/dashboard/MessageDashboard";
import { ProductDashboard } from "../components/dashboard/ProductDashboard";

export const loggedInRoutes = (
  <Route
    element={
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar />
        <Outlet />
      </Box>
    }
  >
    <Route path="/app" element={<TaxCalculator />} />
    <Route
      path="/dashboard"
      element={
        <RestrictedTo role={["admin"]}>
          <DashboardLayout NavigationComponent={<DashboardNavigationPanel />}>
            <Outlet />
          </DashboardLayout>
        </RestrictedTo>
      }
    >
      <Route index element={<Navigate to={"/dashboard/message"} />} />
      <Route
        path="message"
        element={<MessageDashboard />}
        loader={messageLoader}
      />
      <Route path="user" element={<div>This is the user content</div>} />
      <Route path="product" element={<ProductDashboard />} />
    </Route>
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

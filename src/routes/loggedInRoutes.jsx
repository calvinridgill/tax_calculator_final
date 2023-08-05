import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { AppBar } from "../components/AppBar";
import { Box } from "@mui/material";
import { TaxCalculator } from "../pages/TaxCalculator";
import { RestrictedTo } from "./routeUtils";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { NavigationPanel } from "../components/dashboard/NavigationPanel";
import { MessageDashboard } from "../components/dashboard/MessageDashboard";

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
          <DashboardLayout NavigationComponent={<NavigationPanel />}>
            <Outlet />
          </DashboardLayout>
        </RestrictedTo>
      }
    >
      <Route index element={<Navigate to={"/dashboard/message"} />} />
      <Route path="message" element={<MessageDashboard />} />
      <Route path="user" element={<div>This is the user content</div>} />
    </Route>
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

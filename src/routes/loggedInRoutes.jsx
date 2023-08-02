import React from "react";
import { Route, Outlet } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { AppBar } from "../components/AppBar";
import { Box } from "@mui/material";
import { TaxCalculator } from "../pages/TaxCalculator";
import { Dashboard } from "../pages/Dashboard";
import { RestrictedTo } from "./routeUtils";

export const loggedInRoutes = (
  <Route
    element={
      <Box>
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
          <Dashboard />
        </RestrictedTo>
      }
    />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

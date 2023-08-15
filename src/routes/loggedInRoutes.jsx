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
import {
  ProductDashboard,
  loader as productLoader,
} from "../components/dashboard/ProductDashboard";

import {
  action as editProductAction,
  deleteProductAction,
} from "../components/dashboard/EditProductDialog";

import {
  CreateProduct,
  action as createProductAction,
} from "../components/dashboard/CreateProduct";

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
      <Route
        path="product"
        element={
          <Box>
            <ProductDashboard />
            <Outlet />
          </Box>
        }
        loader={productLoader}
        action={editProductAction}
      >
        <Route path="destroy" action={deleteProductAction} />
      </Route>
      <Route
        path="product/create"
        element={<CreateProduct />}
        action={createProductAction}
      />
    </Route>
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

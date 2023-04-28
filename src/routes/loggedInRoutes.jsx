import React from "react";
import { Route, Outlet } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { AppBar } from "../components/AppBar";
import { Box } from "@mui/material";

export const loggedInRoutes = (
  <Route
    element={
      <Box>
        <AppBar />
        <Outlet />
      </Box>
    }
  >
    <Route path="/app" element={<div>This is the app page</div>} />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

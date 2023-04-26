import React from "react";
import { Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { PageNotFound } from "../components/PageNotFound";
import { LoggedOutAppBar } from "../components/LoggedOutAppBar";
import { Signin, action as loginAction } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import Testing from "../pages/Testing";

export const loggedOutRoutes = (
  <Route
    element={
      <Box>
        <LoggedOutAppBar />
        <Outlet />
      </Box>
    }
  >
    <Route path="/signin" element={<Signin />} action={loginAction} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/offering" element={<div>This is the offering page</div>} />
    <Route
      path="/forgot-password"
      element={<div>This is the forgot password</div>}
    />
    <Route path="/testing" element={<Testing />} />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

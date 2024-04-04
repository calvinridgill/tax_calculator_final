import React from "react";
import { Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { PageNotFound } from "../components/PageNotFound";
import { AppBar } from "../components/AppBar";
import { Signin, action as signInAction } from "../pages/Signin";
import { LoggedOutHeader } from "../components/LandingPage/LoggedOutHeader";
import Testing from "../pages/Testing";
import {
  HelpCalvin,
  loader as helpCalvinLoader,
  action as helpCalvinAction,
} from "../pages/HelpCalvin";
import { ErrorPage } from "../components/ErrorPage";

export const loggedOutRoutes = (
  <Route errorElement={<ErrorPage />}>
    <Route
      element={
        <Box>
          <AppBar />
          <Outlet />
        </Box>
      }
    >
      <Route path="/offering" element={<div>This is the offering page</div>} />
      <Route
        path="/forgot-password"
        element={<div>This is the forgot password</div>}
      />
      <Route path="/testing" element={<Testing />} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
    <Route
      path="/signin"
      element={
        <>
          <LoggedOutHeader />
          <Signin />
        </>
      }
      action={signInAction}
    />
    <Route
      path="/itismecalvin"
      loader={helpCalvinLoader}
      action={helpCalvinAction}
      element={<HelpCalvin />}
    />
  </Route>
);

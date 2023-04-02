import React from "react";
import { Route } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { LoggedOutAppBar } from "../components/LoggedOutAppBar";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import Testing from "../pages/Testing";

export const loggedOutRoutes = (
  <Route element={<LoggedOutAppBar />}>
    <Route path="/signin" element={<Signin />} />
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

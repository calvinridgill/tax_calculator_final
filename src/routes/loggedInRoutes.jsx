import React from "react";
import { Route } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { LoggedInAppBar } from "../components/LoggedInAppBar";

// CAUTION: this is not intented to be used as a component, it is just a function
export const loggedInRoutes = () => (
  <Route element={<LoggedInAppBar />}>
    <Route path="/app" element={<div>This is the app page</div>} />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

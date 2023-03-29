import React from "react";
import { Route } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";
import { LoggedInAppBar } from "../components/LoggedInAppBar";

export const loggedInRoutes = (
  <Route element={<LoggedInAppBar />}>
    <Route path="/app" element={<div>This is the app page</div>} />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

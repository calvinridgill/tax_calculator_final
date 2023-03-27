import React from "react";
import { Route } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";

// CAUTION: this is not intented to be used as a component, it is just a function
export const loggedInRoutes = () => (
  <Route>
    <Route path="/app" element={<div>This is the app page</div>} />
    <Route path="/*" element={<PageNotFound />} />
  </Route>
);

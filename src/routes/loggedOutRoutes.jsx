import React from "react";
import { Route } from "react-router-dom";
import { PageNotFound } from "../components/PageNotFound";

export const loggedOutRoutes = () => {
  return (
    <Route>
      <Route path="/signin" element={<div>This is the Sign in page</div>} />
      <Route path="/signup" element={<div>This is the Signup page</div>} />
      <Route path="/offering" element={<div>This is the offering page</div>} />
      <Route
        path="/forgot-password"
        element={<div>This is the forgot password</div>}
      />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  );
};

import React from "react";
import { Route } from "react-router-dom";

// CAUTION: this is not intented to be used as a component, it is just a function
export const commonRoutes = () => (
  <Route>
    <Route path="/" element={<div>This is the landing page</div>} />
  </Route>
);

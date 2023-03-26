import React from "react";
import { Route } from "react-router-dom";

export const commonRoutes = () => (
  <Route>
    <Route path="/" element={<div>This is the landing page</div>} />
  </Route>
);

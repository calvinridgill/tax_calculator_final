import React from "react";
import { Route } from "react-router-dom";
import { LoggedOutAppBar } from "../components/LoggedOutAppBar";

// CAUTION: this is not intented to be used as a component, it is just a function
// TODO: change these function to just a variable declaration
export const commonRoutes = () => (
  <Route element={<LoggedOutAppBar />}>
    <Route path="/" element={<div>This is the landing page</div>} />
  </Route>
);

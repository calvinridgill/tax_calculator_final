import React from "react";
import { Route } from "react-router-dom";
import { LoggedOutAppBar } from "../components/LoggedOutAppBar";
import { LandingPage } from "../pages/landingPage";
import { action as purchaseProductAction } from "../routes/actions/purchaseProduct";

export const commonRoutes = (
  <Route element={<LoggedOutAppBar />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/purchase/:priceId" action={purchaseProductAction} />
  </Route>
);

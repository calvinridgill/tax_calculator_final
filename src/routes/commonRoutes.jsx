import React from "react";
import { Outlet, Route } from "react-router-dom";
import { LoggedOutAppBar } from "../components/LoggedOutAppBar";
import { LandingPage, loader as landingPageLoader } from "../pages/landingPage";
import { action as purchaseProductAction } from "../routes/actions/purchaseProduct";

export const commonRoutes = (
  <Route
    element={
      <>
        <LoggedOutAppBar />
        <Outlet />
      </>
    }
  >
    <Route path="/" element={<LandingPage />} loader={landingPageLoader} />
    <Route path="/purchase/:productId" action={purchaseProductAction} />
  </Route>
);

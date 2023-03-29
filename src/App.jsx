import React from "react";
import { useAuth } from "./context/AuthProvider";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { loggedInRoutes } from "./routes/loggedInRoutes";
import { loggedOutRoutes } from "./routes/loggedOutRoutes";
import { commonRoutes } from "./routes/commonRoutes";
import { CssBaseline } from "@mui/material";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  const auth = useAuth();
  let routes = (
    <Route errorElement={<ErrorPage />}>
      {commonRoutes}
      {loggedOutRoutes}
    </Route>
  );
  if (auth.user)
    routes = (
      <Route errorElement={<ErrorPage />}>
        {commonRoutes}
        {loggedInRoutes}
      </Route>
    );

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

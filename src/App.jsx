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

function App() {
  const auth = useAuth();
  let routes = (
    <Route>
      {commonRoutes()}
      {loggedOutRoutes()}
    </Route>
  );
  if (auth.user)
    routes = (
      <Route>
        {commonRoutes()}
        {loggedInRoutes()}
      </Route>
    );

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return <RouterProvider router={router} />;
}

export default App;

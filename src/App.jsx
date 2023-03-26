import React from "react";
import { useAuth } from "./context/AuthProvider";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { PageNotFound } from "./components/PageNotFound";

const loggedInRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<div>This is the landing page</div>} />
      <Route path="/app" element={<div>This is the app page</div>} />
      <Route path="/*" element={<PageNotFound />} />
    </Route>
  )
);
const loggedOutRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<div>This is the landing page</div>} />
      <Route path="/login" element={<div>This is the Log in page</div>} />
      <Route path="/signup" element={<div>This is the Signup page</div>} />
      <Route path="/offering" element={<div>This is the offering page</div>} />
      <Route
        path="/forgot-password"
        element={<div>This is the forgot password</div>}
      />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Route>
  )
);

function App() {
  const auth = useAuth();
  console.log("idid", "auth.loggedIn", auth.loggedIn);
  let router = loggedOutRouter;
  if (auth.loggedIn) router = loggedInRouter;

  return <RouterProvider router={router} />;
}

export default App;

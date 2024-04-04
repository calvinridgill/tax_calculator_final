import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function PageNotFound() {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) return <Navigate to="/signin" state={{ from: location }} />;

  return (
    <div>
      <h2>It looks like youre lost...</h2>
      <p>
        <Link to="/app">Go to the home page</Link>
      </p>
    </div>
  );
}

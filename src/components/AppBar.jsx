import React from "react";
import { useAuth } from "../context/AuthProvider";
import { LoggedInAppBar } from "./LoggedInAppBar";
import { LoggedOutAppBar } from "./LoggedOutAppBar";
import { useLocation } from "react-router-dom";

export function AppBar() {
  const auth = useAuth();
  const location = useLocation();
  if (location.pathname === "/") return "";
  if (auth.user) return <LoggedInAppBar />;
  else return <LoggedOutAppBar />;
}

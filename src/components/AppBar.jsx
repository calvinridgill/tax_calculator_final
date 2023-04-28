import React from "react";
import { useAuth } from "../context/AuthProvider";
import { LoggedInAppBar } from "./LoggedInAppBar";
import { LoggedOutAppBar } from "./LoggedOutAppBar";

export function AppBar() {
  const auth = useAuth();
  if (auth.user) return <LoggedInAppBar />;
  else return <LoggedOutAppBar />;
}

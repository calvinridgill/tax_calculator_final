import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function LoggedOutAppBar() {
  const auth = useAuth();
  const handleLogin = async () => {
    console.log("idid", "loggin in ");
    await auth.login();
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tax Calculator
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";

export function LoggedInAppBar() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await auth.logout();
  };
  return (
    <>
      <AppBar position="relative" enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar sx={{ p: 0 }}>
            <Box
              component="img"
              src="/images/calculator.png"
              width="40px"
              height="40px"
              color={"white"}
            />
            <Box sx={{ flex: 1 }}>
              <Link
                to="/app"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Tax Calculator
                </Typography>
              </Link>
            </Box>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {auth.user.role === "admin" && (
                  <MenuItem
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

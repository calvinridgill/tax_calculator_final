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
import { Link } from "react-router-dom";

import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";

export function LoggedInAppBar() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      <AppBar position="relative" color="transparent" enableColorOnDark>
        <Container>
          <Toolbar sx={{ gap: { xs: 1, md: 2 }, p: 0 }}>
            <Box
              component="img"
              src="/images/tax-calculate.png"
              width="40px"
              height="40px"
            />
            <Box sx={{ flex: 1 }}>
              <Link
                to="/app"
                style={{ textDecoration: "none", color: "black" }}
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
                color="primary"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

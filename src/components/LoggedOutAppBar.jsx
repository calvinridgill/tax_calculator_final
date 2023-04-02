import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/system";
import { useTheme, useMediaQuery } from "@mui/material";

export function LoggedOutAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tax Calculator
            </Typography>
            <Button
              href="/login"
              sx={{
                textTransform: "none",
                borderRadius: 10,
              }}
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

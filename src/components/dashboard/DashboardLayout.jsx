import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Container, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ClickAwayListener } from "@mui/material";

export function DashboardLayout({ NavigationComponent, children }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showNavigationPanel, setShowNavigationPanel] = React.useState(true);
  if (!isSmallScreen)
    return (
      <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ flex: 2 }}>{NavigationComponent}</Box>
          <Box sx={{ flex: 5 }}>{children}</Box>
        </Box>
      </Container>
    );
  return (
    <Box
      sx={[
        showNavigationPanel && {
          bgcolor: "#7e7e7f",
          transition: "background 1s",
          minHeight: "100vh",
        },
      ]}
    >
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            onClick={(e) => {
              console.log("idid", "clicked");
              e.stopPropagation();
              setShowNavigationPanel((p) => !p);
            }}
            sx={{ ml: -2 }}
          >
            <MenuIcon fill="secondary" />
          </IconButton>
          <Box sx={{ position: "relative" }}>
            <ClickAwayListener
              onClickAway={() => {
                console.log("idid", "click away listener clicked");
                setShowNavigationPanel((p) => (p ? !p : p));
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bgcolor: "red",
                  minHeight: 500,
                  minWidth: 275,
                  opacity: showNavigationPanel ? 1 : 0,
                  left: showNavigationPanel ? 0 : -300,
                  transition: "opacity 0.1s, left .5s",
                }}
              >
                {NavigationComponent}
              </Box>
            </ClickAwayListener>
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

DashboardLayout.propTypes = {
  NavigationComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

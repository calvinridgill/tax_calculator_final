import React from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import { Box, IconButton, Container, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ClickAwayListener } from "@mui/material";

export function DashboardLayout({ NavigationComponent, children }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showNavigationPanel, setShowNavigationPanel] = React.useState(true);
  const location = useLocation();
  const [pathname, setPathname] = React.useState(location.pathname);
  React.useEffect(() => {
    if (pathname !== location.pathname) {
      setShowNavigationPanel(false);
      setPathname(location.pathname);
    }
  }, [location.pathname]);
  if (!isSmallScreen)
    return (
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Box sx={{ display: "flex", gap: 5, height: 1 }}>
          <Box sx={{ flex: 2, height: 1 }}>{NavigationComponent}</Box>
          <Box sx={{ flex: 5 }}>{children}</Box>
        </Box>
      </Container>
    );
  return (
    <Box
      sx={[
        showNavigationPanel && {
          bgcolor: "#979595",
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
              e.stopPropagation();
              setShowNavigationPanel((p) => !p);
            }}
            sx={{ ml: -2 }}
          >
            <MenuIcon fill="secondary" />
          </IconButton>
          <Box sx={{ position: "relative", alignSelf: "stretch" }}>
            <ClickAwayListener
              onClickAway={() => {
                setShowNavigationPanel((p) => (p ? !p : p));
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bgcolor: "#f4f4f4",
                  minHeight: "90vh",
                  minWidth: 275,
                  opacity: showNavigationPanel ? 1 : 0,
                  left: showNavigationPanel ? 0 : -300,
                  transition: "opacity 0.5s ease-in-out, left 0.5s ease-in-out",
                  borderRadius: "2px",
                  p: 2,
                  zIndex: 10,
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

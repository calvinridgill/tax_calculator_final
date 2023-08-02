import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Container, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ClickAwayListener } from "@mui/material";

export function Dashboard() {
  return (
    <DashboardLayout NavigationComponent={<NavigationPanel />}>
      <ContentPanel />
    </DashboardLayout>
  );
}

function NavigationPanel() {
  return <Box sx={{}}>Left panel</Box>;
}

function ContentPanel() {
  return <Box sx={{ height: "30vh" }}>Content panel </Box>;
}

function DashboardLayout({ NavigationComponent, children }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showNavigationPanel, setShowNavigationPanel] = React.useState(true);
  if (!isSmallScreen)
    return (
      <Container maxWidth="xl" sx={{ pt: 3, pb: 5 }}>
        <Box sx={{ display: "flex", gap: 5 }}>
          {NavigationComponent}
          {children}
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
                setShowNavigationPanel((p) => (p ? !p : p));
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bgcolor: "red",
                  minHeight: 200,
                  minWidth: 300,
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

import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export function LoggedOutHeader() {
  const { user } = useAuth();
  const location = useLocation();
  const [moveTitleBar, setMoveTitleBar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/tax-prep-tool" ||
      location.pathname.startsWith("/about/")
    )
      return setMoveTitleBar(true);
    function handleScroll() {
      if (window.scrollY > 60) setMoveTitleBar(true);
      else setMoveTitleBar(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  return (
    <Box sx={{ position: "relative", zIndex: 2 }}>
      <Box
        sx={[
          {
            height: "60px",
            background: "rgba(0,0,0,0.2)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          },
          moveTitleBar && { display: "none" },
        ]}
      />
      <Box
        sx={[
          {
            position: "fixed",
            top: 60,
            transition: "top 0.5s ease",
            width: "100%",
          },
          moveTitleBar && {
            background: "#ededed",
            top: 0,
            boxShadow: "0px 10px 25px 0px rgba(0,0,0,.2)",
          },
        ]}
      >
        <Container
          maxWidth="md"
          sx={{
            left: 0,
            display: "flex",
          }}
        >
          <Box
            sx={[
              { ml: { xs: 13, sm: 20 } },
              moveTitleBar && {
                position: "relative",
                display: "flex",
                alignItems: "center",

                "&::after": [
                  {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderBottom: "7px solid black",
                    opacity: 1,
                    left: "11%",
                    marginLeft: " -10px",
                  },
                  location.pathname === "/tax-prep-tool" && {
                    left: "50%",
                  },
                  user && {
                    left: "10%",
                  },
                  user &&
                    location.pathname === "/tax-prep-tool" && {
                      left: "45%",
                    },
                  location.pathname !== "/" &&
                    location.pathname !== "/tax-prep-tool" && {
                      opacity: 0,
                    },
                ],
              },
            ]}
          >
            <Box
              sx={{
                flex: 4,
                display: "flex",
                gap: 3,
                justifyContent: "center",
                py: 1,
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/">
                <Typography
                  variant="body2"
                  sx={[
                    {
                      color: "white",
                      px: 2,
                      py: 1,
                      "&:hover": { bgcolor: "#999889" },
                      borderRadius: "3px",
                    },
                    moveTitleBar && {
                      color: "black",
                      "&:hover": { bgcolor: "#d9d9d9" },
                    },
                  ]}
                >
                  HOME
                </Typography>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/tax-prep-tool">
                <Typography
                  variant="body2"
                  sx={[
                    {
                      color: "white",
                      px: 2,
                      py: 1,
                      "&:hover": { bgcolor: "#999889" },
                      borderRadius: "3px",
                    },
                    moveTitleBar && {
                      color: "black",
                      "&:hover": { bgcolor: "#d9d9d9" },
                    },
                  ]}
                >
                  TAX PREP TOOL
                </Typography>
              </Link>
              {user ? (
                <Link style={{ textDecoration: "none" }} to="/app">
                  <Typography
                    variant="body2"
                    sx={[
                      {
                        color: "white",
                        px: 2,
                        py: 1,
                        "&:hover": { bgcolor: "#999889" },
                        borderRadius: "3px",
                        border: "1px solid #ff00de",
                        animation: "moving-border 3s infinite",
                        "@keyframes moving-border": {
                          "0%": {
                            borderColor: "#ff00de",
                          },
                          "50%": {
                            borderColor: "#00ffea",
                          },
                          "100%": {
                            borderColor: "#ff00de",
                          },
                        },
                      },
                      moveTitleBar && {
                        color: "black",
                        "&:hover": { bgcolor: "#d9d9d9" },
                      },
                    ]}
                  >
                    GO TO APP
                  </Typography>
                </Link>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/signin">
                  <Typography
                    variant="body2"
                    sx={[
                      {
                        color: "white",
                        px: 2,
                        py: 1,
                        "&:hover": { bgcolor: "#999889" },
                        borderRadius: "3px",
                      },
                      moveTitleBar && {
                        color: "black",
                        "&:hover": { bgcolor: "#d9d9d9" },
                      },
                    ]}
                  >
                    LOG IN
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
          <Box sx={{ flex: 1 }} />
        </Container>
      </Box>
    </Box>
  );
}

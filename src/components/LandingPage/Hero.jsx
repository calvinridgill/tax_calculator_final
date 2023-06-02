import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./hero.module.css";

export function Hero() {
  const [moveTitleBar, setTitleBar] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 60) setTitleBar(true);
      else setTitleBar(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box>
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
            moveTitleBar && { background: "#ededed", top: 0 },
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
              sx={{
                flex: 4,
                display: "flex",
                gap: 3,
                justifyContent: "center",
                pt: 2,
                pb: 2,
              }}
            >
              <Box
                sx={[
                  moveTitleBar && {
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-17px",
                      width: 0,
                      height: 0,
                      borderLeft: "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderBottom: "7px solid black",
                      opacity: 1,
                      left: "50%",
                      marginLeft: " -10px",
                    },
                  },
                ]}
              >
                <Link style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={[
                      { color: "white" },
                      moveTitleBar && { color: "black" },
                    ]}
                  >
                    HOME
                  </Typography>
                </Link>
              </Box>
              <Link style={{ textDecoration: "none" }} to="/app">
                <Typography
                  variant="body2"
                  sx={[{ color: "white" }, moveTitleBar && { color: "black" }]}
                >
                  TAX PREP TOOL
                </Typography>
              </Link>
            </Box>
            <Box sx={{ flex: 1 }} />
          </Container>
        </Box>
      </Box>
      <Box component={"section"} sx={{ position: "relative" }}>
        <Box sx={{ height: 1, position: "absolute", left: 0, right: 0 }}>
          <Box
            className={styles.heroImage}
            sx={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              position: "relative",
              transition: "opacity 1.5s ease",
              transform: "translateZ(0)",
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ minHeight: 650, position: "relative" }}>
          <Container
            sx={{
              maxWidth: {
                xs: "100%",
                sm: "80%",
                md: "760px",
                lg: "960px",
                xl: "1024px",
              },
              pt: 30,
            }}
          >
            <Box>
              {/* title */}
              <Box sx={{ color: "white" }}>
                {" "}
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "center",
                    fontSize: "54px !important",
                    fontWeight: 700,
                    textShadow: "0 0 18px rgba(0,0,0,0.5)",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  EZ Profit & Loss Statements plus Schedule C
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "24px !important",
                    mt: 6,
                    mb: 6,
                    textAlign: "center",
                    textShadow: "0 0 18px rgba(0,0,0,0.5)",
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  Independent Contractors Save Hundreds in Taxes Owed By
                  Reducing your Income with Expenses. See your Refund amount
                  automatically calculated as you enter your numbers.
                </Typography>
              </Box>
              {/* call for action */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    bgcolor: "white",
                    borderRadius: "50%",
                    fontSize: 40,
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "40px" }}
                    className="material-symbols-outlined"
                  >
                    mail
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

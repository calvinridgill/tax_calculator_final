import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";

export function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ p: 2, bgcolor: "#bababa" }}>
      <Container
        sx={{
          xs: "100%",
          sm: "80%",
          md: "960px",
          lg: "1024px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontFamily={"Lato, sans-serif"}>
            <Link
              to="/merchant-policies"
              style={{
                textDecoration: "none",
                color: "black",
                display: "inline-block",
              }}
            >
              <Typography
                variant="h6"
                component="span"
                style={{ fontSize: "14px", fontWeight: 400 }}
              >
                Merchant Policies
              </Typography>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography style={{ color: "white" }}>
                {" "}
                &nbsp; &nbsp; | &nbsp; &nbsp;
              </Typography>
            </Link>
            <Link
              to="/legal-notice"
              style={{
                textDecoration: "none",
                color: "black",
                display: "inline-block",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{ mb: 1 }}
                style={{ fontSize: "14px", fontWeight: 400 }}
              >
                Legal Notice
              </Typography>
            </Link>
          </Typography>

          <Stack direction={"row"}>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Stack>

        {showScroll && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 9999,
            }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: "50%",
                boxShadow: "0px 4px 14px 1px rgba(0,0,0,.41)",
                transition: ".3s",
                transform: "scale(1)",
                opacity: 1,
                width: "60px",
                height: "60px",
                p: 1,
                "&:hover": {
                  backgroundColor: "#343434",
                  color: "#fff",
                },
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}

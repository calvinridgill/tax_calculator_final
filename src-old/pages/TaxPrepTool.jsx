import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { PurchaseButton } from "../components/PurchaseButton";
import { Link } from "react-router-dom";
import { SubHeader } from "../components/LandingPage/SubHeader";

export function TaxPrepTool() {
  return (
    <Box sx={{ pt: 6 }}>
      <SubHeader title={"Profit & Loss Spreadsheet"} />
      <Box>
        <Container maxWidth="xs">
          <Box
            sx={{
              py: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                pb: 5,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              DIY Tax & Financial Statements Template
            </Typography>
            <Box
              className="mainImage"
              component={"img"}
              src="/images/spreadsheet_on_pc.png"
              height="220px"
              sx={{
                opacity: 0,
                animation: "fade-in 1.5s ease forwards",
                "@keyframes fade-in": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{ pb: 2, fontFamily: "Lato, sans-serif" }}
            >
              Tax Preparation Spreadsheet
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontFamily: "Lato, sans-serif" }}
            >
              Introducing the Tax Preparation Spreadsheet designed for
              individuals, a comprehensive tool to help you manage...
            </Typography>
            <Box sx={{ pb: 3 }}>
              <Link style={{ color: "inherit" }}>Learn more</Link>
            </Box>
            <Typography sx={{ pb: 2, fontFamily: "Lato, sans-serif" }}>
              <b>$20.00</b> per access
            </Typography>
            <PurchaseButton>Get Yours</PurchaseButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SubHeader } from "../components/LandingPage/SubHeader";
import { BorderRight } from "@mui/icons-material";

export default function MerchantPolicies() {
  return (
    <Box sx={{ pt: 6 }}>
      <SubHeader title={"Merchant Policies"} />
      <Box>
        <Container
          maxWidth="md"
          style={{ paddingTop: "60px", paddingBottom: "60px" }}
        >
          {/* Delivery Methods Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 4,
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <Box sx={{ flex: 1 }} style={{ marginBottom: "1.5rem" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Delivery Methods
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography>
                <strong>Collection</strong>
              </Typography>
              <Typography>Free</Typography>
            </Box>
          </Box>

          {/* Payment Options Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 4,
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Payment Options
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} style={{ marginBottom: "1.5rem" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                <strong>Payment Methods Accepted</strong>
              </Typography>
              <img
                src="https://s.uenicdn.com/assets/8b61ec92665b873bad042800ed2e3ffbb77d604e/static/images/a864530041d8402ff329d210792e0602.svg"
                alt="Payment Methods"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Box>

          {/* Policy Links Section */}
          <Box sx={{ pt: 4, borderBottom: "1px solid #e3e3e3", pb: 4 }}>
            <Box sx={{ display: "inlineBox", justifyContent: "space-between" }}>
              <Link
                to="/terms-and-conditions"
                sx={{
                  fontSize: "14px",
                }}
                style={{
                  BorderRight: "1px solid #ebebeb",
                  paddingRight: ".65rem",
                  color: "#000000",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy-policy"
                sx={{
                  fontSize: "14px",
                }}
                style={{
                  BorderRight: "1px solid #ebebeb",
                  paddingRight: ".65rem",
                  color: "#000000",
                  fontWeight: 400,
                  textDecoration: "none",
                  marginLeft: ".65rem",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/return-and-refund-policy"
                sx={{
                  fontSize: "14px",
                }}
                style={{
                  BorderRight: "1px solid #ebebeb",
                  paddingRight: ".65rem",
                  color: "#000000",
                  fontWeight: 400,
                  textDecoration: "none",
                  marginLeft: ".65rem",
                }}
              >
                Refund Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

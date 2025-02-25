import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SubHeader } from "../components/LandingPage/SubHeader";

export default function LegalNotice() {
  return (
    <Box sx={{ pt: 6 }}>
      <SubHeader title={"Legal Notice"} />
      <Box>
        <Container
          maxWidth="md"
          style={{ paddingTop: "60px", paddingBottom: "60px" }}
        >
          <Box
            sx={{
              py: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                mb: 2,
                borderBottom: "1px solid #d8d8d8",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Business Name
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography>
                  INCOME TAX CALCULATOR : THE BEST TOOL FOR INDEPENDENT
                  CONTRACTORS
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                mb: 2,
                borderBottom: "1px solid #d8d8d8",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Registered Company Name
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography>
                  INCOME TAX CALCULATOR : THE BEST TOOL FOR INDEPENDENT
                  CONTRACTORS
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

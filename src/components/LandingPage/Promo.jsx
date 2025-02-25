import { Box, Stack, Typography, Container } from "@mui/material";
import React from "react";
import { PurchaseButton } from "../PurchaseButton";

export function Promo() {
  return (
    <Box>
      <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
        <PurchaseButton
          sx={{
            width: 1,
            borderWidth: "0 !important",
            bgcolor: "inherit !important",
          }}
        >
          <Stack
            spacing={1}
            sx={{
              bgcolor: "#343434",
              color: "white",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              borderRadius: 1,
              width: 1,
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Box sx={{ width: "35%", paddingLeft: 8 }}>
              <PromoIcon />
            </Box>
            <Stack sx={{ flex: 1, gap: 2, p: 3 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, fontFamily: "Montserrat, sans-serif" }}
              >
                Limited Time Offer
              </Typography>
              <Typography
                sx={{ fontWeight: 700, fontFamily: "Lato, sans-serif" }}
              >
                $20 limited time!
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  // color: "#2ce4c4",
                  color: "#fff",
                  animation: "color-animation 3s infinite",
                  "@keyframes color-animation": {
                    "0%": {
                      color: "#fff",
                    },
                    "50%": {
                      color: "#00ffea",
                    },
                    "100%": {
                      color: "#fff",
                    },
                  },
                }}
              >
                Buy now!
              </Typography>
            </Stack>
          </Stack>
        </PurchaseButton>
      </Container>
    </Box>
  );
}

function PromoIcon() {
  return (
    <Box sx={{ position: "relative", minHeight: 100 }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          content: "''",
          borderStyle: "solid",
          borderColor: "#2ce4c4",
          borderWidth: 40,
          borderBottomColor: "transparent",
          width: 0,
          height: 0,
          borderTopWidth: 120,
          borderBottomWidth: 30,
        }}
      />
      <Box
        component={"img"}
        src="/icons/star.svg"
        width={35}
        height={35}
        sx={{ position: "absolute", top: 40, left: 23 }}
      />
    </Box>
  );
}

import React from "react";
import { SubHeader } from "./SubHeader";
import { Box, Stack, Container, Typography } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { PurchaseButton } from "../PurchaseButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const commonStyles = {
  element: {
    display: "flex",
    border: "1px solid black",
    borderRadius: "30px",
    borderColor: "#4ce5ca",
    boxShadow: "0px 10px 25px 0px rgba(0,0,0,.1)",
    bgcolor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: 350, sm: 296 },
    minHeight: "60px",
  },
  text: {
    fontFamily: "Lato, sans-serif",
    textAlign: "left",
    wordBreak: "break-word",
    padding: "0 1.25em",
    fontWeight: "500",
    flex: 1,
  },
  icon: {
    fontSize: 35,
    width: 45,
    ml: 2,
  },
};
export function Why() {
  return (
    <Box>
      <SubHeader title="Why Choose EZ Profit & Loss" />
      <Container
        sx={{
          xs: "100%",
          sm: "80%",
          md: "960px",
          lg: "1024px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8, mb: 4 }}>
          <Stack
            gap={3}
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Stack gap={3}>
              <Box sx={commonStyles.element}>
                <Box>
                  <StarOutlineIcon sx={commonStyles.icon} />
                </Box>
                <Typography sx={commonStyles.text}>
                  Debit & Credit cards accepted
                </Typography>
              </Box>
              <Box sx={commonStyles.element}>
                <Box>
                  <StarOutlineIcon sx={commonStyles.icon} />
                </Box>
                <Typography sx={commonStyles.text}>
                  No Installations Needed
                </Typography>
              </Box>
            </Stack>
            <Stack gap={3}>
              <Box sx={commonStyles.element}>
                <Box>
                  <StarOutlineIcon sx={commonStyles.icon} />
                </Box>
                <Typography sx={commonStyles.text}>
                  See Your Profit Quickly
                </Typography>
              </Box>
              <Box sx={commonStyles.element}>
                <Box>
                  <StarOutlineIcon sx={commonStyles.icon} />
                </Box>
                <Typography sx={commonStyles.text}>Easy to Use Doc</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}>
          <PurchaseButton
            sx={{
              bgcolor: "transparent !important",
              borderWidth: "0px !important",
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: 1,
                bgcolor: "#ededed",
                width: 150,
                height: 60,
                boxShadow: "0px 10px 25px 0px rgba(0,0,0,.1)",
                borderRadius: "30px",
                // border: "1px solid #4ce5ca",
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
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  bgcolor: "#343434",
                },
                "&:hover #shopping-cart-icon": {
                  fill: "white",
                },
              }}
            >
              <ShoppingCartIcon
                id="shopping-cart-icon"
                sx={{ fill: "black" }}
              />
              &nbsp; Buy Now
            </Box>
          </PurchaseButton>
        </Box>
      </Container>
    </Box>
  );
}

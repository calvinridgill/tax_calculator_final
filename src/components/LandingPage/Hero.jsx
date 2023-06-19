import React from "react";
import { Box, Container, Typography } from "@mui/material";
import styles from "./hero.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { PurchaseButton } from "../PurchaseButton";

export function Hero() {
  return (
    <Box>
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
                md: "960px",
                lg: "1024px",
              },
              pt: {
                xs: 20,
                sm: 30,
              },
            }}
          >
            <Box>
              {/* title */}
              <Box sx={{ color: "white" }}>
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
                    mt: 3,
                    mb: 3,
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
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pb: 5,
                  zIndex: 20,
                  [theme.breakpoints.down("sm")]: {
                    position: "fixed",
                    pb: 0,
                    bottom: 5,
                    right: 5,
                  },
                })}
              >
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
                      bgcolor: "white",
                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
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
                  </Box>
                </PurchaseButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

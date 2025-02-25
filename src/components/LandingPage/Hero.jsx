import React from "react";
import { Box, Container, Typography, Modal, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./hero.module.css";
import EmailIcon from "@mui/icons-material/Email";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Form } from ".././Form";
import { PurchaseButton } from "../PurchaseButton";

export function Hero() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    width: "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 0,
    height: "90vh",
    overflow: "scroll",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ outline: "none" }}
      >
        <Box sx={style}>
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              color: "#000",
              top: 8,
              right: 8,
              minWidth: "32px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            <CloseIcon />
          </Button>
          <Form />
        </Box>
      </Modal>
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
                <Box sx={{ color: "white" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      textAlign: "center",
                      fontSize: {
                        xs: "28px",
                        sm: "36px",
                        md: "48px",
                        lg: "54px",
                      },
                      fontWeight: 700,
                      textShadow: "0 0 18px rgba(0,0,0,0.5)",
                      fontFamily: "Montserrat, sans-serif",
                      lineHeight: "1.5em",
                    }}
                  >
                    INCOME TAX CALCULATOR : THE BEST TOOL FOR INDEPENDENT
                    CONTRACTORS
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: {
                        xs: "18px",
                        sm: "20px",
                        md: "24px",
                        lg: "28px",
                      },
                      mt: 3,
                      mb: 3,
                      textAlign: "center",
                      textShadow: "0 0 18px rgba(0,0,0,0.5)",
                      fontFamily: "Montserrat, sans-serif",
                      lineHeight: "1.5em",
                    }}
                  >
                    See your refund amount or the amount you owe automatically
                    calculated as you enter your income. Separate Tax
                    calculators for Independent Contractors (Gig Workers) and
                    Regular Wage Workers (W-2)
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
                        width: 150,
                        height: 60,
                        boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
                        borderRadius: "30px",
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
                        sx={{
                          fill: "black",
                        }}
                      />
                      &nbsp; Buy Now
                    </Box>
                  </PurchaseButton>
                  <Box
                    onClick={handleOpen}
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
                      "&:hover": {
                        bgcolor: "#343434",
                      },
                      "&:hover #EmailIcon": {
                        fill: "white",
                      },
                    }}
                  >
                    <EmailIcon
                      id="EmailIcon"
                      sx={{ fill: "black", cursor: "pointer" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}

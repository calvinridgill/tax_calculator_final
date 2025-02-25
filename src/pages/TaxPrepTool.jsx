import React from "react";
import { Box, Container, Typography, Modal, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PurchaseButton } from "../components/PurchaseButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { SubHeader } from "../components/LandingPage/SubHeader";
import { Form } from "../components/Form";

export function TaxPrepTool() {
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
                    width: 120,
                    height: 40,
                    boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
                    borderRadius: "20px",
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
              <br />
              <Button
                sx={{
                  border: "1px solid #000",
                  color: "#000",
                  borderRadius: "20px",
                  px: 2,
                }}
                onClick={handleOpen}
              >
                Get Yours
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

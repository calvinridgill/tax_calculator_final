import React from "react";
import { SubHeader } from "./SubHeader";
import { Box, Stack, Container, Typography } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8, mb: 8 }}>
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
      </Container>
    </Box>
  );
}

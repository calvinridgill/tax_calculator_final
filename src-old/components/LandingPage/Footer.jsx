import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function Footer() {
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
            Copyright © 2023 EZ SAS.
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
      </Container>
    </Box>
  );
}

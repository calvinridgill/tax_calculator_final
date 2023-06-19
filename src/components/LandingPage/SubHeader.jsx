import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

const commonStyles = {
  container: {
    xs: "100%",
    sm: "80%",
    md: "960px",
    lg: "1024px",
  },
};

export function SubHeader({ title }) {
  return (
    <Box sx={{ bgcolor: "#343434", p: 1, overflow: "hidden" }}>
      <Container
        sx={{
          maxWidth: commonStyles.container,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h3"
            color="white"
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {title}
          </Typography>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                content: '""',
                width: 30,
                height: 3,
                bgcolor: "#676767",
                position: "absolute",
                left: 10,
                top: "50%",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              content: '""',
              width: 0,
              height: 0,
              border: "12px solid transparent",
              borderTopColor: "#343434",
              position: "absolute",
              top: 5,
              left: 1,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

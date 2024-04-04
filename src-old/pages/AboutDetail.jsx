import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { SubHeader } from "../components/LandingPage/SubHeader";
import { aboutContents, Service } from "../components/LandingPage/About";
import { ContactUs } from "../components/ContactUs";

import { PurchaseButton } from "../components/PurchaseButton";

export function AboutDetail() {
  const content = useLoaderData();

  return (
    <Box sx={{ pt: 6 }}>
      <SubHeader title={"About"} />
      <Container maxWidth="lg">
        <Box sx={{ my: 5 }}>
          <Service imgSrc={content.imgSrc} title={content.title}>
            {content.description_long}
          </Service>
        </Box>
      </Container>
      <SubHeader title={"Purchase Yours"} />
      <Container maxWidth="lg">
        <Box sx={{ my: 5 }}>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Calculate Your Taxes with Ease
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Our advanced tax calculator simplifies the process of determining
              your taxes. Say goodbye to complicated calculations!
            </Typography>

            <PurchaseButton size="large" type="submit">
              Get Yours
            </PurchaseButton>
          </Box>
        </Box>
      </Container>
      <ContactUs />
    </Box>
  );
}

export function loader({ params }) {
  const aboutContent = aboutContents.find((el) => {
    const title = el.link.replace("/about/", "").toLowerCase().trim();
    return title === params.title;
  });
  return aboutContent;
}

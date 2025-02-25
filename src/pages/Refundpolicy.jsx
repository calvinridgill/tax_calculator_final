import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SubHeader } from "../components/LandingPage/SubHeader";

export default function Refundpolicy() {
    return (
        <Box sx={{ pt: 6 }}>
            <SubHeader title={"Refund Policy"} />
            <Box>
                <Container
                    maxWidth="md"
                    style={{ paddingTop: "60px", paddingBottom: "60px" }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography>Please contact us for our full Refunds & Returns Policy.</Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

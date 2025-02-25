import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { SubHeader } from "../components/LandingPage/SubHeader";

export default function TermsandCondition() {
    return (
        <Box sx={{ pt: 6 }}>
            <SubHeader title={"Terms and Conditions"} />
            <Box>
                <Container
                    maxWidth="md"
                    style={{ paddingTop: "60px", paddingBottom: "60px" }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography>Please contact us for our full Terms & Conditions.</Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

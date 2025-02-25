import React, { useState, useEffect } from "react";
import { Box, colors, Container, Paper, Typography } from "@mui/material";
import { useFetcher } from "react-router-dom";
import { TextField, InputAdornment, Checkbox } from "@mui/material";
import { CustomButton } from "./common/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { ThankYouCard } from "./ThankYou";

export function Form() {
    const fetcher = useFetcher();
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        if (fetcher.data && fetcher.data.status === "success") {
            setIsSubmitted(true);
        }
    }, fetcher.data);

    return (
        <Box>
            <Container maxWidth="lg">
                <fetcher.Form method="post" action="/ask_help">
                    <Box
                        sx={{
                            my: 5,
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            gap: 5,
                        }}
                    >
                        {isSubmitted ? (
                            <ThankYouCard />
                        ) : (
                            <Paper
                                sx={{
                                    maxWidth: 800,
                                    flex: 1,
                                    p: 4,
                                    bgcolor: "#ededed",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        textAlign: "center",
                                        mb: 2,
                                        fontFamily: "Montserrat, sans-serif",
                                        fontWeight: 600,
                                    }}
                                >
                                    Contact Us
                                </Typography>
                                
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    Tell us about your request
                                </Typography>
                                <TextField
                                    name="message"
                                    fullWidth
                                    required
                                    variant="filled"
                                    multiline
                                    minRows={3}
                                    maxRows={5}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 5,
                                        my: 5,
                                        justifyContent: "center",
                                    }}
                                >

                                    <Box sx={{ minWidth: 300, flex: 1 }}>
                                        <TextField
                                            name="first_name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Your first name"
                                            placeholder="First name"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 10,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 300, flex: 1 }}>
                                        <TextField
                                            name="last_name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Your last name"
                                            placeholder="Last name"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 10,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 300, flex: 1 }}>
                                        <TextField
                                            name="email"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Your email"
                                            placeholder="Email"
                                            type="email"
                                            helperText="We'll never share your email."
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 10,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 300, flex: 1 }}>
                                        <TextField
                                            name="phone"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Your phone number"
                                            placeholder="eg +1 212 736 310"
                                            type="number"
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 10,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    fontSize: "14px",
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ display: "flex", alignItems:"start"
                                        }}>
                                    <Checkbox
                                        name="termsAgreement"
                                        size="small"
                                        fullWidth
                                        type="checkbox"
                                        required
                                        sx={{ pt:0}}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        <span>I agree with the <a style={{color:"inherit"}} href="/terms-and-conditions" target="_blank" rel="noopener nofollow noreferrer">Terms &amp; Conditions</a> and the <a href="/privacy-policy" style={{color:"inherit"}} target="_blank" rel="noopener nofollow noreferrer">Privacy &amp; Cookies Policy</a> of UENI and any applicable Terms and Conditions of INCOME TAX CALCULATOR :       THE BEST TOOL FOR INDEPENDENT CONTRACTORS.</span>

                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        my: 2,
                                        mt: 4,
                                    }}
                                >
                                    <CustomButton
                                        type="submit"
                                        sx={{ width: 180 }}
                                        disabled={fetcher.state === "submitting"}
                                    >
                                        Send Message
                                    </CustomButton>
                                </Box>
                            </Paper>
                        )}

                    </Box>
                </fetcher.Form>
            </Container>
        </Box>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    console.log("Form Data : ", message, firstName, lastName, phone, email);
    return { status: "success" };
}

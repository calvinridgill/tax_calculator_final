import React, { useState, useEffect } from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useFetcher } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import { CustomButton } from "./common/CustomButton";
import { SubHeader } from "../components/LandingPage/SubHeader";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { ThankYouCard } from "./ThankYou";

export function ContactUs() {
  const fetcher = useFetcher();
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (fetcher.data && fetcher.data.status === "success") {
      setIsSubmitted(true);
    }
  }, fetcher.data);

  return (
    <Box>
      <SubHeader title={"Get in Touch"} />
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
                  Simplify Your Tax Life
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    mb: 4,
                    fontSize: 14,
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  {"We'd"} love to hear from you! Whether you have questions
                  about our DIY Tax Prep spreadsheet or {"you're"} ready to
                  purchase yours, simply fill out the form below and a member of
                  our team will be in touch with you shortly.
                </Typography>
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
                          fontSize: "14px", // Set the desired font size for the placeholder
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
                          fontSize: "14px", // Set the desired font size for the placeholder
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
                          fontSize: "14px", // Set the desired font size for the placeholder
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
                          fontSize: "14px", // Set the desired font size for the placeholder
                        },
                      }}
                    />
                  </Box>
                </Box>
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
            <Box sx={{ minWidth: 200 }}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Box
                  component={"img"}
                  src="/icons/email.svg"
                  height={25}
                  width={25}
                  sx={{ mt: "5px" }}
                />
                <Stack gap={1}>
                  <Typography variant="body" fontWeight={500}>
                    Send us an email
                  </Typography>
                  <Typography variant="body1">caltyrid@gmail.com</Typography>
                </Stack>
              </Box>
            </Box>
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
  console.log("idid", "message", message, firstName, lastName, phone, email);
  //TODO: create an api to save messages from users
  return { status: "success" };
}

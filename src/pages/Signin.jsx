import React from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Form, useNavigation } from "react-router-dom";
import { sleep } from "../utils";

export function Signin() {
  const navigation = useNavigation();
  return (
    <Form method="post">
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
        }}
      >
        <Box sx={{ flex: 1, height: "94vh", p: 2 }}>
          <Typography p={10}>Some info about the company</Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#eee",
            flex: 1,
            height: "94vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* layout element start */}
          <Box
            sx={{
              height: "150px",
            }}
          />
          {/* layout element end */}
          <Paper
            elevation={3}
            sx={{
              p: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              width: "100%",
              maxWidth: 400,
              mb: 4,
            }}
          >
            <Typography variant="h2">Welcome</Typography>
            <TextField
              variant="outlined"
              type="email"
              placeholder="Enter your email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "#e7f0fe",
              }}
            />
            <TextField
              variant="outlined"
              type="password"
              placeholder="Enter your password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "#e7f0fe",
              }}
            />
            <Button
              sx={{
                textTransform: "none",
                maxWidth: 200,
                mt: 3,
              }}
              variant="contained"
              fullWidth
              size="large"
              disabled={navigation.state === "submitting"}
              type="submit"
            >
              Login
            </Button>
          </Paper>
        </Box>
      </Box>
    </Form>
  );
}

export const action = async () => {
  await sleep(2000);
  return null;
};

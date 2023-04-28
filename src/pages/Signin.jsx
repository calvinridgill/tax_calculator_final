import React, { useEffect } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { signin } from "../api/auth";
import LocalStorage from "../utils/localStorage";
import { axios } from "../utils/axios";
import { useAuth } from "../context/AuthProvider";
import { useAlert } from "../context/AlertProvider";

export function Signin() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const auth = useAuth();
  const alert = useAlert();
  console.log(alert);

  useEffect(() => {
    if (actionData?.error) {
      console.log(actionData.error);
      alert.showError(actionData.error);
    }
    if (actionData?.user) {
      auth.getIdentity().then(() => {
        navigate("/app");
        console.log("redirecting to /app");
      });
    }
  }, [actionData]);
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
              name="email"
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
              name="password"
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

export const action = async ({ request }) => {
  try {
    // * 1. Get the email and password from the form
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    // * 2. Send the email and password to the backend
    const res = await signin(email, password);
    // * 3. If the email and password are correct, the backend will send back a token
    const token = res.token;
    const user = res.data.user;
    if (token) {
      //* 4. Store the token in local storage and in axios headers
      LocalStorage.setItem("token", token);
      axios.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return { user };
  } catch (error) {
    // console.log(error);
    if (error?.response?.data?.message) {
      return { error: error.response.data.message };
    }
  }
};

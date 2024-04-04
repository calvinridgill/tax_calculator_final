import React, { useEffect, useRef } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  useLocation,
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

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const password = params.get("password");
  const loginButtonRef = useRef(null);

  const token = LocalStorage.getItem("token");

  useEffect(() => {
    if (email && password) {
      alert.showInfo("Logging you in...", 3000);
      loginButtonRef.current.click();
    }
  }, [email, password]);

  useEffect(() => {
    if (actionData?.error) {
      console.log(actionData.error);
      alert.showError(actionData.error);
    }
    if (actionData?.user || token) {
      auth.getIdentity().then(() => {
        navigate("/app");
      });
    }
  }, [actionData, token]);

  return (
    <Form method="post">
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
          minHeight: "calc(100vh - 50px)",
          mt: { xs: 6 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            textAlign: "center",
            backgroundImage: "url(/images/tax_calculator_graphics_1000.jpg)",
            backgroundPosition: "50% 50%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            bgcolor: "#fff",
            minHeight: 600,
          }}
        >
          <Typography
            variant="h3"
            component={"h1"}
            sx={{ mt: { md: 5 }, fontFamily: "Montserrat sans-serif" }}
          >
            EZ Profit & Loss Statements plus Schedule C
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#eee",
            flex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
          {/* layout element start */}
          <Box
            sx={{
              height: { md: "150px", xs: "10px" },
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
              maxWidth: 500,
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "Montserrat sans-serif" }}
            >
              Welcome
            </Typography>
            <TextField
              variant="outlined"
              type="email"
              name="email"
              defaultValue={email}
              placeholder="Enter your email"
              disabled={navigation.state === "submitting"}
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
              defaultValue={password}
              placeholder="Enter your password"
              disabled={navigation.state === "submitting"}
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
              ref={loginButtonRef}
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
    throw error;
  }
};

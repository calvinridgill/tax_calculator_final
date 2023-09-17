import React from "react";
import { getAllProducts } from "../api/product";
import {
  Navigate,
  useLoaderData,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useAlert } from "../context/AlertProvider";
import { useAuth } from "../context/AuthProvider";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { createAccount } from "../api/auth";
import LocalStorage from "../utils/localStorage";
import { axios } from "../utils/axios";

export function HelpCalvin() {
  const navigation = useNavigation();
  const products = useLoaderData();
  const actionData = useActionData();
  const alert = useAlert();
  const auth = useAuth();
  const token = LocalStorage.getItem("token");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (actionData?.error) {
      alert.showError(actionData.error);
    }
    if (actionData?.user || token) {
      auth.getIdentity().then(() => {
        navigate("/dashboard/product");
      });
    }
  }, [actionData, token]);
  if (products.length > 0) {
    return <Navigate to="/404" />;
  }
  return (
    <Box>
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom>
          Hello Calvin, Create an account here
        </Typography>
        <Form method="post">
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              maxWidth: 600,
              gap: 2,
            }}
          >
            <TextField
              label="First Name"
              defaultValue={"Calvin"}
              name="firstName"
              required
            />
            <TextField
              label="Last Name"
              defaultValue={"Ridgill"}
              name="lastName"
              required
            />
            <TextField
              label="Email"
              defaultValue={"caltyrid@gmail.com"}
              name="email"
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirm_password"
              required
            />
            <Button type="submit" disabled={navigation.state === "submitting"}>
              Create Account
            </Button>
          </Paper>
        </Form>
        <Typography variant="body2" sx={{ py: 2 }}>
          This page will be removed once you create an account and a product
        </Typography>
      </Container>
    </Box>
  );
}

export async function loader() {
  const products = await getAllProducts();
  return products;
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    if (password !== confirmPassword)
      return { error: "Uh-oh! Passwords don't match. Please try again." };
    const res = await createAccount({
      firstName,
      lastName,
      email,
      password,
      pass: "itismecalvin",
    });
    const token = res.token;
    const user = res.data.user;
    if (token) {
      //* 4. Store the token in local storage and in axios headers
      LocalStorage.setItem("token", token);
      axios.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return { user };
  } catch (error) {
    console.log("error", error);
    return { error: "Error happened while creating your account" };
  }
}

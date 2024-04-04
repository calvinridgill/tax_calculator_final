import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { getMe, logout as logMeOut } from "../api/auth";
import { CircularProgress, Box } from "@mui/material";
import LocalStorage from "../utils/localStorage";
import { useAlert } from "./AlertProvider";
const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const alert = useAlert();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = LocalStorage.getItem("token");
    if (token) getIdentity();
    else setUser(null);
  }, []);

  const getIdentity = async () => {
    setUser(undefined);
    try {
      const res = await getMe();
      const user = res.data.data;
      setUser(user);
    } catch (error) {
      alert.showError("Error fetching user data");
      LocalStorage.removeItem("token");
      setUser(null);
    }
  };
  const logout = async () => {
    try {
      await logMeOut();
      setUser(null);
      LocalStorage.removeItem("token");
    } catch (error) {
      alert.showError("Error logging out");
    }
  };
  const value = { user, getIdentity, logout };

  if (user === undefined)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

import React, { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { getMe } from "../api/auth";
import { CircularProgress, Box } from "@mui/material";
import LocalStorage from "../utils/localStorage";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
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
      console.log("error", error);
      setUser(null);
    }
    console.log("idid", "getting user");
  };
  const value = { user, getIdentity };

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

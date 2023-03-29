import React, { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Biruk" });
  const logout = async () => {
    console.log("idid", "logging out");
    setUser(null);
    window.location.href = "/";
  };
  const login = async () => {
    console.log("idid", "logging in");
    setUser({ name: "Biruk" });
    window.location.href = "/app";
  };

  const value = { user, logout, login };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

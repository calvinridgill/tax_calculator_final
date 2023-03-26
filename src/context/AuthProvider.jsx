import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const value = { loggedIn: true };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

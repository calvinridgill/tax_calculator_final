import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const authContext = createContext(null);

export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const value = { user: null };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

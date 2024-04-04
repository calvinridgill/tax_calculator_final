import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 6000,
  });

  const showError = (message, duration = 6000) => {
    setAlert({ open: true, message, severity: "error", duration });
  };
  const showSuccess = (message, duration = 6000) => {
    setAlert({ open: true, message, severity: "success", duration });
  };
  const showInfo = (message, duration = 6000) => {
    setAlert({ open: true, message, severity: "info", duration });
  };
  const showWarning = (message, duration = 6000) => {
    setAlert({ open: true, message, severity: "warning", duration });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const value = {
    showError,
    showSuccess,
    closeAlert,
    showInfo,
    showWarning,
  };
  return (
    <AlertContext.Provider value={value}>
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.duration}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>
);

import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./navigationPanelStyles.module.css";
import clsx from "clsx";

export function NavigationPanel() {
  return (
    <Box
      sx={{
        height: 1,
        borderRight: "1px solid whitesmoke",
        py: 2,
        display: "flex",
        gap: 1,
        flexDirection: "column",
      }}
    >
      <NavLink
        to="message"
        className={({ isActive, isPending }) =>
          clsx(
            styles.navLink,
            isActive ? styles.active : isPending ? styles.pending : ""
          )
        }
      >
        Message
      </NavLink>
      <NavLink
        to="user"
        className={({ isActive, isPending }) =>
          clsx(
            styles.navLink,
            isActive ? styles.active : isPending ? styles.pending : ""
          )
        }
      >
        User
      </NavLink>
    </Box>
  );
}

import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./navigationPanelStyles.module.css";
import clsx from "clsx";

export function DashboardNavigationPanel() {
  return (
    <Box
      sx={{
        height: 1,
        borderRight: { xs: "unset", md: "1px solid #c4c4c4" },
        py: 2,
        display: "flex",
        gap: 1,
        flexDirection: "column",
      }}
    >
      {/* <NavLink
        to="user"
        className={({ isActive, isPending }) =>
          clsx(
            styles.navLink,
            isActive ? styles.active : isPending ? styles.pending : ""
          )
        }
      >
        User
      </NavLink> */}
      <NavLink
        to="product"
        className={({ isActive, isPending }) =>
          clsx(
            styles.navLink,
            isActive ? styles.active : isPending ? styles.pending : ""
          )
        }
      >
        Product
      </NavLink>
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
        to="config"
        className={({ isActive, isPending }) =>
          clsx(
            styles.navLink,
            isActive ? styles.active : isPending ? styles.pending : ""
          )
        }
      >
        Config  
      </NavLink>
    </Box>
  );
}

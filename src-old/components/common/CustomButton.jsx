import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const CustomButton = React.forwardRef(
  ({ children, sx, ...other }, ref) => {
    const defaultStyles = {
      borderRadius: 5,
      textTransform: "none",
      color: "inherit",
      borderColor: "#343434",
      "&:hover": {
        bgcolor: "#343434",
        borderColor: "#343434",
        color: "white",
      },
    };
    const mergedStyles = { ...defaultStyles, ...sx };
    return (
      <Button
        ref={ref}
        variant="outlined"
        color="primary"
        sx={mergedStyles}
        {...other}
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

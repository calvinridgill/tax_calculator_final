import React from "react";
import PropTypes from "prop-types";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = "LinkBehaviour";

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};

let customMuiTheme = createTheme({
  typography: {
    body1: {
      "@media (max-width:600px)": {
        fontSize: "0.94rem",
      },
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

customMuiTheme = responsiveFontSizes(customMuiTheme, {
  factor: 2,
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
  variants: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "button",
  ],
});

export { customMuiTheme };

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
  palette: {
    mode: "light",
    text: {
      primary: "#28323C",
      secondary: "#646E78",
      disabled: "#C8D2DC",
      light: "#646E78",
      lighter: "#A0AAB4",
      lightest: "#C8D2DC",
      themostlight: "#F6F6F6",
    },
    background: {
      default: "#f5f5f6",
      paper: "#ffffff",
      lighter: "#C8D2DC",
      lightest: "#EAEEF0",
      themostlight: "#F6F6F6",
      darkBanner: "#282a33",
    },
  },
  typography: {
    body1: {
      "@media (max-width:600px)": {
        fontSize: "0.94rem",
      },
    },
    htmlFontSize: 16,
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

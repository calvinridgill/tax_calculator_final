import { createTheme, responsiveFontSizes } from "@mui/material";

let customMuiTheme = createTheme({
  typography: {
    body1: {
      "@media (max-width:600px)": {
        fontSize: "0.94rem",
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

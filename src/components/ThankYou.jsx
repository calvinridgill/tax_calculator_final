import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import Confetti from "react-confetti";
console.log("hello");
export function ThankYouCard({ confetti = true }) {
  const [showConfetti, setShowConfetti] = useState(confetti);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    return () => clearTimeout(timer); // This will clear the timer when the component is unmounted or updated
  }, []);
  return (
    <Card
      sx={{
        maxWidth: 800,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showConfetti && <Confetti maxWidth={800} height={400} />}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
        }}
      >
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
          Thank You!
        </Typography>
        <Typography variant="body" color="text.secondary">
          We sincerely appreciate your submission. Your form has been
          successfully received and we will endeavor to respond to your query at
          the earliest possible convenience.
        </Typography>
      </CardContent>
    </Card>
  );
}

ThankYouCard.propTypes = {
  confetti: PropTypes.bool,
};

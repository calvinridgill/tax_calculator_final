import React, { useState } from "react";
import { DataSheetGrid } from "react-datasheet-grid";
import { Skeleton, Box } from "@mui/material";
// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";
import "../styles/react-datasheet-grid.css";

export function SpreadSheetSkeleton() {
  const [data, setData] = useState(Array(40).fill({}));

  const columns = Array(10).fill({
    component: () => (
      <Box sx={{ px: 1, width: 1, display: "flex", justifyContent: "center" }}>
        <Skeleton width="90%" height="30px" />
      </Box>
    ),
    title: "",
  });

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <DataSheetGrid value={data} onChange={setData} columns={columns} />
    </Box>
  );
}

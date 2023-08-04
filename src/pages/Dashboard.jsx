import React from "react";
import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { NavigationPanel } from "../components/dashboard/NavigationPanel";

export function Dashboard() {
  return (
    <DashboardLayout NavigationComponent={<NavigationPanel />}>
      <ContentPanel />
    </DashboardLayout>
  );
}

function ContentPanel() {
  return <Box sx={{ height: "30vh" }}>Content panel </Box>;
}

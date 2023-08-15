import React from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { MessageTable } from "./MessageTable";
import { TableToolBar } from "./MessageTableToolbar";
import { getAllMessage } from "../../api/message";

export function MessageDashboard() {
  const [selectedTab, setSelectedTab] = React.useState("unread");
  const messages = useLoaderData();

  return (
    <Box sx={{ pt: 3 }}>
      <Tabs
        value={selectedTab}
        onChange={(event, newVal) => setSelectedTab(newVal)}
        centered
      >
        <Tab label="Unread" value={"unread"} />
        <Tab label="Read" value={"read"} />
        <Tab label="All" value={"all"} />
      </Tabs>
      <Box sx={{ py: 1 }}>
        <TableToolBar selectedMessageIds={[]} />
        <MessageTable messages={messages} />
      </Box>
    </Box>
  );
}

export async function loader() {
  try {
    const { data } = await getAllMessage();
    const messages = data.data;
    return messages;
  } catch (error) {
    return [];
  }
}

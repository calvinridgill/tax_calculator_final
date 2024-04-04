import React from "react";
import { useLoaderData, defer } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { MessageTable } from "./MessageTable";
import { TableToolBar } from "./MessageTableToolbar";
import { getAllMessage } from "../../api/message";
import { SuspenseAwait } from "../common/SuspenseAwait";

export function MessageDashboard() {
  const [selectedTab, setSelectedTab] = React.useState("unread");
  const { messages } = useLoaderData();

  return (
    <SuspenseAwait resolve={messages}>
      {(messages) => {
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
      }}
    </SuspenseAwait>
  );
}

export async function loader() {
  try {
    const messagesPromise = new Promise((resolve, reject) => {
      try {
        getAllMessage().then((res) => {
          resolve(res.data.data);
        });
      } catch (error) {
        reject(error);
      }
    });
    return defer({ messages: messagesPromise });
  } catch (error) {
    return [];
  }
}

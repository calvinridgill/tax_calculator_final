import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paper, Checkbox, Typography, Box } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Button } from "@mui/material";

export function MessageTable({ messages }) {
  const [openMessageDetailDialog, setOpenMessageDetailDialog] = React.useState({
    isOpen: false,
    message: {},
  });
  if (messages.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" gutterBottom>
          No message found
        </Typography>
      </Box>
    );
  }

  function getFullName(firstname, lastname) {
    const firstLetterReg = /(^\w)/;
    return `${firstname.replace(firstLetterReg, (l) =>
      l.toUpperCase()
    )} ${lastname.replace(firstLetterReg, (l) => l.toUpperCase())}`;
  }
  function getDate(rawDate) {
    if (!rawDate) return null;
    const date = new Date(rawDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  function openMessageDialog(message) {
    setOpenMessageDetailDialog({ isOpen: true, message });
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={true}
                  checked={true}
                  onChange={() => {}}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message._id}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  openMessageDialog(message);
                }}
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" checked={true} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {getFullName(message.firstname, message.lastname)}
                </TableCell>
                <TableCell>{getDate(message.createdAt)}</TableCell>
                <TableCell>{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MessageDetailDialog
        message={{ message: "some message" }}
        isOpen={openMessageDetailDialog.isOpen}
        onClose={() => {
          setOpenMessageDetailDialog({ isOpen: false, message: {} });
        }}
      />
    </Box>
  );
}

MessageTable.propTypes = {
  messages: PropTypes.array.isRequired,
};

function MessageDetailDialog({ message, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Message</DialogTitle>
      <DialogContent>{message.message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
      </DialogActions>
    </Dialog>
  );
}
MessageDetailDialog.propTypes = {
  message: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

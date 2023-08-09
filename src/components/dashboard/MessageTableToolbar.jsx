import React from "react";
import PropTypes from "prop-types";
import { Form, useNavigation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function TableToolBar({ selectedMessageIds }) {
  const numSelected = selectedMessageIds.length;
  const navigation = useNavigation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        p: 2,
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}></Box>
      )}
      <Form
        action="destroy"
        method="delete"
        onSubmit={() => {
          //TODO: show a confirmation dialog
        }}
      >
        <input
          hidden
          name="tournament_ids"
          value={selectedMessageIds}
          readOnly
        />
        <Button
          startIcon={<DeleteIcon />}
          variant="text"
          color="primary"
          disabled={numSelected === 0 || navigation.state === "submitting"}
          size="small"
          type="submit"
        >
          Delete
        </Button>
      </Form>
    </Box>
  );
}
TableToolBar.propTypes = {
  selectedMessageIds: PropTypes.array.isRequired,
};

// export async function deleteTournamentAction({ request }) {
//     const formData = await request.formData()
//     const messageIds = formData.get("tournament_ids").split(",")
//     await Promise.all(messageIds.map((id) => deleteTournament(id)))
//     return redirect("/tournament")
// }

// export async function archiveTournamentAction({ request }) {
//     const formData = await request.formData()
//     const messageIds = formData.get("tournament_ids").split(",")
//     await Promise.all(
//         messageIds.map((id) => updateTournament(id, { status: "archived" })),
//     )
//     return redirect("/tournament")
// }

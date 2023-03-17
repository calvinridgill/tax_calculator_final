import express from "express";

const PORT = 9090;
const app = express();

app.listen(PORT, () => {
  console.log("Express server started running on ", PORT);
});

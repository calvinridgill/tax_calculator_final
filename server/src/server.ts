import { app } from "./app";
const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log("Tax Calculator app running on port ", PORT);
});

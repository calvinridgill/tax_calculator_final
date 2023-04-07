import { config } from "dotenv";
config();
import { app } from "./app";
import { openMongooseConnection } from "./db";
const PORT = process.env.PORT || 9090;

openMongooseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Tax Calculator app running on port ", PORT);
    });
  })
  .catch((error) => {
    console.log("error in opening mongoose connection ", error);
  });

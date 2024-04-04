import { config } from "dotenv"
config({ path: "../../.env" })
import { openMongooseConnection, closeMongooseConnection } from "../db"
import { loadConfig } from "../models/config"
import { Email } from "../utils/email"
;(async () => {
  try {
    await openMongooseConnection()
    await loadConfig()
    await new Email("p@gmail.com").sendAccountCreated({
      firstname: "user.firstName",
      lastname: "user.lastname",
      email: "email@gmail.com",
      password: "password",
      loginUrl: "loginUlr",
    })
    await closeMongooseConnection()
  } catch (error) {
    console.log("error ----> ", error)
  }
})()

import { config } from "dotenv"
config({ path: "../../.env" })
import { Email } from "../utils/email"
;(async () => {
  try {
    await new Email("imbiruk@gmail.com").sendAccountCreated({
      firstname: "user.firstName",
      lastname: "user.lastname",
      email: "email@gmail.com",
      password: "password",
      loginUrl: "loginUlr",
    })
  } catch (error) {
    console.log("error ----> ", error)
  }
})()

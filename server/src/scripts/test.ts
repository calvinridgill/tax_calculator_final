import { config } from "dotenv"
config({ path: "../../.env" })
import { Email } from "../utils/email"
;(async () => {
  try {
    const email = new Email("meetbirukberhanu@gmail.com")
    await email.test()
  } catch (error) {
    console.log("error ----> ", error)
  }
})()

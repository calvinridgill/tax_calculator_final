import { MyStripe } from "../services/MyStripe"
import { config } from "dotenv"
config({ path: "../../.env" })
import { Email } from "../utils/email"
;(async () => {
  try {
    const start = Date.now()
    console.log("idid", "----> ", "sending")
    const email = new Email(
      { to: "meetbirukberhanu@gmail.com", firstName: "Biruk" },
      "https://google.com",
    )
    const progress = Date.now()
    console.log("idid", "----> ", "in progress", (progress - start) / 1000)

    await email.send("template", "my subject")
    console.log("idid", "----> ", "complete", (Date.now() - progress) / 1000)
  } catch (error) {
    console.log("=-====> ", error)
  }
})()

import nodemailer from "nodemailer"
import { htmlToText } from "html-to-text"
import { getAccountCreatedHtml } from "../emailTemplates/index"
import { currentEnvConfig } from "../models/config"

export class Email {
  private to: string

  constructor(email: string) {
    this.to = email
  }

  newTransport() {
    if (
      !(
        currentEnvConfig.SENDGRID_USERNAME && currentEnvConfig.SENDGRID_PASSWORD
      )
    )
      throw new Error("SendGrid username and password is required")

    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: currentEnvConfig.SENDGRID_USERNAME,
        pass: currentEnvConfig.SENDGRID_PASSWORD,
      },
    })
  }

  // Send the actual email
  async send(html, subject) {
    const from = `${currentEnvConfig.CALVIN_NAME} <${currentEnvConfig.EMAIL_FROM}>`
    const mailOptions = {
      from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    }

    // 3) Create a transport and send email
    const transport = this.newTransport()
    await transport.sendMail(mailOptions)
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Tourney Family!")
  }
  async sendPasswordReset(resetURL) {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)",
    )
  }

  /**
   * @param {Object} data
   * @property {string} data.firstname
   * @property {string} data.lastname
   * @property {string} data.email
   * @property {string} data.password
   * @property {string} data.loginUrl
   */
  async sendAccountCreated(data) {
    const subject = "EZ Tax calculator Account Created"
    console.log(data)
    const html = getAccountCreatedHtml(data)
    await this.send(html, subject)
  }

  async test() {
    const subject = "Testing email"
    const html = "<h1>Testing email</h1>"
    await this.send(html, subject)
  }
}

import nodemailer from "nodemailer"
import { htmlToText } from "html-to-text"
import { getAccountCreatedHtml } from "../emailTemplates/index"

export class Email {
  private to: string
  private from: string

  constructor(email: string) {
    this.to = email
    this.from = `${process.env.CALVIN_NAME} <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      })
    }
    if (
      !(
        process.env.EMAIL_PORT &&
        process.env.EMAIL_HOST &&
        process.env.SENDGRID_USERNAME &&
        process.env.SENDGRID_PASSWORD
      )
    )
      throw new Error(
        "Email host, Email port, username and password is required",
      )

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    })
  }

  // Send the actual email
  async send(html, subject) {
    const mailOptions = {
      from: this.from,
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
    const html = getAccountCreatedHtml(data)
    await this.send(html, subject)
  }

  async test() {
    const subject = "Testing email"
    const html = "<h1>Testing email</h1>"
    await this.send(html, subject)
  }
}

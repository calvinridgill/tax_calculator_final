import nodemailer from "nodemailer"
import { htmlToText } from "html-to-text"

export class Email {
  private to: string
  private firstName: string
  private url: string
  private from: string

  constructor(user, url) {
    this.to = user.to
    this.firstName = user.firstName
    this.url = url
    this.from = `Biruk Berhanu <${process.env.EMAIL_FROM}>`
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
        process.env.EMAIL_USERNAME &&
        process.env.EMAIL_PASSWORD
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
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = `First Name${this.firstName} \n url: ${this.url} \n subject: ${subject}`
    //TODO: prepare email template

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
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

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)",
    )
  }
}

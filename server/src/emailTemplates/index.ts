import fs from "fs"
import mjml2html from "mjml"
import Handlebars from "handlebars"
import { currentEnvConfig } from "../models/config"

let accountCreatedMjml = ""
try {
  accountCreatedMjml = fs.readFileSync(`${__dirname}/accountCreated.mjml`, {
    encoding: "utf-8",
  })
} catch (err) {
  console.error("An error occurred:=----->", err)
  // Handle the error in some way, perhaps exit the process or return from the function
}

/**
 * @param {Object} data
 * @property {string} data.firstname
 * @property {string} data.lastname
 * @property {string} data.email
 * @property {string} data.password
 * @property {string} data.url
 */
export function getAccountCreatedHtml(data) {
  const accountCreatedHtml = mjml2html(accountCreatedMjml).html
  const accountCreatedTemplate = Handlebars.compile(accountCreatedHtml)
  return accountCreatedTemplate({
    ...data,
    companyName: currentEnvConfig.COMPANY_NAME,
  })
}

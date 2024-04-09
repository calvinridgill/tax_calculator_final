import { google, sheets_v4, drive_v3 } from "googleapis"
import { currentEnvConfig } from "../models/config"

export class GoogleSheet {
  private static client
  private googleSheets: sheets_v4.Sheets
  private originalSpreadSheetId: string
  private constructor() {
    this.googleSheets = google.sheets({
      version: "v4",
      auth: GoogleSheet.client,
    })
    this.originalSpreadSheetId = currentEnvConfig.ORIGINAL_SPREADSHEET_ID
  }

  private static async initializeClient() {
    if (!this.client) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "tax-calculator-new-391013-37b0d1adaaf9.json",
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      })
      this.client = await auth.getClient()
    }
  }

  static async createInstance() {
    await GoogleSheet.initializeClient()
    const instance = new GoogleSheet()
    return instance
  }

  public createGoogleSheet = async (
    title = "Tax Calculator",
  ): Promise<string> => {
    const spreadsheet = await this.googleSheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    })
    return spreadsheet.data.spreadsheetId
  }

  public copyTaxCalculatorContent = async (
    newUserEmail: string,
    originalSpreadSheetId?: string,
    newSpreadSheetId?: string,
  ): Promise<string> => {
    // prepare spreadsheet ids
    if (
      this.originalSpreadSheetId === undefined &&
      originalSpreadSheetId === undefined
    )
      throw new Error("originalSpreadSheetId is undefined")

    if (originalSpreadSheetId === undefined && this.originalSpreadSheetId)
      originalSpreadSheetId = this.originalSpreadSheetId

    if (newSpreadSheetId === undefined)
      newSpreadSheetId = await this.createGoogleSheet()
      const response = await this.googleSheets.spreadsheets.sheets.copyTo({
      spreadsheetId: originalSpreadSheetId,
      sheetId: 0, // Assuming the first sheet contains the tax calculator content
      requestBody: {
        destinationSpreadsheetId: newSpreadSheetId,
      },
    })
    const newSheetId = response.data.sheetId
    // delete the default sheet
    await this.googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: newSpreadSheetId,
      requestBody: {
        requests: [
          {
            deleteSheet: {
              sheetId: 0,
            },
          },
          {
            updateSheetProperties: {
              properties: {
                sheetId: newSheetId,
                title: "Tax Calculator",
              },
              fields: "title",
            },
          },
        ],
      },
    })
    // Assign permission to another Gmail user to view the copied sheet
    await this.addWriterPermission(newSpreadSheetId, newUserEmail)
    return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`
  }
  private async addWriterPermission(
    spreadsheetId: string,
    emailAddress: string,
  ) {
    const drive: drive_v3.Drive = google.drive({
      version: "v3",
      auth: GoogleSheet.client,
    })

    await drive.permissions.create({
      fileId: spreadsheetId,
      sendNotificationEmail: false,
      requestBody: {
        role: "writer", // Can be 'reader', 'writer', or 'owner'
        type: "user",
        emailAddress: emailAddress,
      },
    })
  }
}
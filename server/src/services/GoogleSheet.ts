import { google, sheets_v4 } from "googleapis"

export class GoogleSheet {
  private static client
  private googleSheets: sheets_v4.Sheets
  public static originalSpreadSheetId = process.env.ORIGINAL_SPREADSHEET_ID

  private constructor() {
    this.googleSheets = google.sheets({
      version: "v4",
      auth: GoogleSheet.client,
    })
  }

  private static async initializeClient() {
    if (!this.client) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "tax-calculator-387602-7637de9962d4.json",
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

    const drive = google.drive({ version: "v3", auth: GoogleSheet.client })
    await drive.permissions.create({
      fileId: spreadsheet.data.spreadsheetId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: process.env.CALVIN_EMAIL,
      },
    })
    return spreadsheet.data.spreadsheetId
  }

  public copyTaxCalculatorContent = async (
    originalSpreadSheetId?: string,
    newSpreadSheetId?: string,
  ): Promise<string> => {
    // prepare spreadsheet ids
    if (
      GoogleSheet.originalSpreadSheetId === undefined &&
      originalSpreadSheetId === undefined
    )
      throw new Error("originalSpreadSheetId is undefined")

    if (
      originalSpreadSheetId === undefined &&
      GoogleSheet.originalSpreadSheetId
    )
      originalSpreadSheetId = GoogleSheet.originalSpreadSheetId

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

    return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`
  }
}

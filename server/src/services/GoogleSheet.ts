import { google, sheets_v4, drive_v3 } from "googleapis";
import { currentEnvConfig } from "../models/config";

export class GoogleSheet {
  private static client;
  private googleSheets: sheets_v4.Sheets;
  private originalSpreadSheetId: string;

  private constructor() {
    this.googleSheets = google.sheets({
      version: "v4",
      auth: GoogleSheet.client,
    });
    this.originalSpreadSheetId = currentEnvConfig.ORIGINAL_SPREADSHEET_ID;
  }

  // Method to initialize the Google Sheets client
  private static async initializeClient() {
    if (!this.client) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "tax-calculator-new-391013-37b0d1adaaf9.json",
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
      this.client = await auth.getClient();
    }
  }

  // Method to create an instance of GoogleSheet class
  static async createInstance() {
    await GoogleSheet.initializeClient();
    return new GoogleSheet();
  }

  // Method to create a new Google Sheet
  public async createGoogleSheet(title = "Tax Calculator"): Promise<string> {
    const spreadsheet = await this.googleSheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    });
    return spreadsheet.data.spreadsheetId;
  }

public async copyTaxCalculatorContent(
  newUserEmail: string,
  originalSpreadSheetId?: string,
  newSpreadSheetId?: string
): Promise<string> {
  // Check if originalSpreadSheetId is provided, if not use the default one
  if (!originalSpreadSheetId && !this.originalSpreadSheetId)
    throw new Error("originalSpreadSheetId is not defined");

  originalSpreadSheetId = originalSpreadSheetId || this.originalSpreadSheetId;

  // If newSpreadSheetId is not provided, create a new sheet
  newSpreadSheetId = newSpreadSheetId || (await this.createGoogleSheet());

  // Copy content from the original sheet to the new sheet
  const response = await this.googleSheets.spreadsheets.sheets.copyTo({
    spreadsheetId: originalSpreadSheetId,
    sheetId: 0,
    requestBody: {
      destinationSpreadsheetId: newSpreadSheetId,
    },
  });

  // Get the new sheet id
  const newSheetId = response.data.sheetId;

  // Clear the existing data from the new sheet
  await this.googleSheets.spreadsheets.values.clear({
    spreadsheetId: newSpreadSheetId,
    range: "Sheet1!A1:Z",
  });

  const customData = [
    ["Income", ""],
    ["Gross Income", 9000],
    ["", ""],
    
    ["Expense", ""],
    ["Gas", 50],
    ["Supplies", 10],
    ["Cell Phone", 5],
    ["Auto insurance", 10],
    ["Office expense", 5],
    ["All other expenses", 15],
    ["Commissions and fees", 5],
    ["Auto lease or note payment", 2],
    ["Auto Repairs and maintenance", 4],
    ["Legal and professional services", 5],
                  
    ["", ""],
    ["Net income", 1000],
  ];

  // Add the new data to the new sheet
  await this.googleSheets.spreadsheets.values.update({
    spreadsheetId: newSpreadSheetId,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: customData,
    },
  });

  // Add writer permission for the new user
  await this.addWriterPermission(newSpreadSheetId, newUserEmail);

  // Return the URL of the new sheet
  return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`;
}

  // Method to add writer permission to a sheet
  private async addWriterPermission(
    spreadsheetId: string,
    emailAddress: string
  ) {
    const drive: drive_v3.Drive = google.drive({
      version: "v3",
      auth: GoogleSheet.client,
    });

    await drive.permissions.create({
      fileId: spreadsheetId,
      sendNotificationEmail: false,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: emailAddress,
      },
    });
  }
}
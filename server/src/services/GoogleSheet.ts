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

  static async createInstance() {
    await GoogleSheet.initializeClient();
    const instance = new GoogleSheet();
    return instance;
  }

  public copyTaxCalculatorContent = async (
    newUserEmail: string
  ): Promise<string> => {
    if (!this.originalSpreadSheetId) throw new Error("originalSpreadSheetId is undefined");

    // Copy the sheet
    const response = await this.googleSheets.spreadsheets.sheets.copyTo({
      spreadsheetId: this.originalSpreadSheetId,
      sheetId: 0,
      requestBody: {
        destinationSpreadsheetId: this.originalSpreadSheetId,
      },
    });
    const newSheetId = response.data.sheetId;

    // Add custom data to the copied sheet
    const customData = [
      ["Name", "Age", "Location"],
      ["John", 30, "New York"],
      ["Alice", 25, "Los Angeles"],
      ["Bob", 35, "Chicago"],
    ];
    await this.addCustomDataToSheet(this.originalSpreadSheetId, newSheetId, customData);

    // Add writer permission to the new sheet
    await this.addWriterPermission(this.originalSpreadSheetId, newUserEmail);

    return `https://docs.google.com/spreadsheets/d/${this.originalSpreadSheetId}/edit#gid=${newSheetId}`;
  };

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
        role: "writer", // Can be 'reader', 'writer', or 'owner'
        type: "user",
        emailAddress: emailAddress,
      },
    });
  }

  private async addCustomDataToSheet(
    spreadsheetId: string,
    sheetId: number,
    data: any[][]
  ) {
    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `${sheetId}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: data,
      },
    });
  }
}

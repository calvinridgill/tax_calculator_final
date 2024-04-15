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

  // Method to copy content from an existing sheet and create a new one
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

    // Delete the default sheet and set title to "Tax Calculator" for the new sheet
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
    });

    const customData = [
      ["Income", "", ""],
      ["Gross Income", 29000, ""],
      ["", "", ""],
      ["Expense", "", ""],
      ["Car", 2000, ""],
      ["Gas", 4000, ""],
      ["Insurance", 2000, ""],
      ["", "", ""],
      ["Net income", 21000, ""],
      ["", "", ""],
      ["New Field", "New Value", ""], // Add additional fields as needed
    ];

    try {
      // Send the custom data to the spreadsheet
      await this.sendCustomData(customData, newSpreadSheetId);
      console.log("Custom data sent successfully!");

      // Add writer permission for the new user
      await this.addWriterPermission(newSpreadSheetId, newUserEmail);
    } catch (error) {
      console.error("Failed to send custom data:", error);
      throw error;
    }

    // Return the URL of the new sheet
    return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`;
  }

  // Method to send custom data to a sheet
  public async sendCustomData(
    data: any[][], // Custom data to send, represented as a 2D array
    spreadsheetId: string // ID of the spreadsheet to update
  ): Promise<void> {
    const range = "Sheet1!A1";
    const valueInputOption = "USER_ENTERED";
    const requestBody = {
      values: data,
    };

    try {
      await this.googleSheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: valueInputOption,
        requestBody: requestBody,
      });
    } catch (error) {
      console.error("Error sending custom data to spreadsheet:", error);
      throw error;
    }
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

import { google, sheets_v4, drive_v3 } from "googleapis";
import { currentEnvConfig } from "../models/config";
import { Product } from "../models/product";

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

  // Method to copy content from the original sheet to the new sheet
  public async copyTaxCalculatorContent(
    newUserEmail: string,
    originalSpreadSheetId?: string,
    newSpreadSheetId?: string
  ): Promise<string> {
    // Check if originalSpreadSheetId is provided, if not use the default one
    if (!originalSpreadSheetId && !this.originalSpreadSheetId)
      throw new Error("originalSpreadSheetId is not defined");

    originalSpreadSheetId =
      originalSpreadSheetId || this.originalSpreadSheetId;

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

    const products = await Product.find({});
    const customData = [
      ["Income", ""],
      ["Gross Income", products[0].income.toString()],
      ["", ""],
      ["Expense", ""],
      ["Gas", products[0].gas.toString()],
      ["Supplies", products[0].supplies.toString()],
      ["Cell Phone", products[0].cell_phone.toString()],
      ["Auto insurance", products[0].auto_insurance.toString()],
      ["Office expense", products[0].office_expense.toString()],
      ["All other expenses", products[0].other_expenses.toString()],
      ["Commissions and fees", products[0].commissions_fees.toString()],
      [
        "Auto lease or note payment",
        products[0].auto_lease_note_payment.toString(),
      ],
      [
        "Auto Repairs and maintenance",
        products[0].auto_repairs_maintenance.toString(),
      ],
      [
        "Legal and professional services",
        products[0].legal_professional_services.toString(),
      ],
      ["", ""],
      ["Net income", products[0].Total_Income.toString()],
    ];

    // Add the new data to the new sheet
    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: newSpreadSheetId,
      range: "Sheet1!C4",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: customData,
      },
    });

    const cellData = [
      { cell: "F1", value: products[0].name.toString() },
      { cell: "F3", value: products[0].description.toString() },
    ];

    const batchUpdateData = cellData.map(({ cell, value }) => ({
      range: `Sheet1!${cell}`,
      values: [[value]],
    }));

    await this.googleSheets.spreadsheets.values.batchUpdate({
      spreadsheetId: newSpreadSheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: batchUpdateData,
      },
    });

    // Update the new sheet name to "Tax Calculator"
    await this.googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: newSpreadSheetId,
      requestBody: {
        requests: [
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

  // Method to update the original sheet with the data from the Tax Calculator sheet
  public async updateOriginalSheetWithTaxCalculatorData(
    originalSpreadSheetId: string,
    newSpreadSheetId: string
  ): Promise<void> {
    // Get data from the "Tax Calculator" sheet
    const response = await this.googleSheets.spreadsheets.values.get({
      spreadsheetId: newSpreadSheetId,
      range: "A1:Z", // Assuming the data range covers all cells
    });

    const values = response.data.values;

    if (!values) {
      throw new Error("No data found in the Tax Calculator sheet.");
    }

    // Clear existing data in the original "Sheet1"
    await this.googleSheets.spreadsheets.values.clear({
      spreadsheetId: originalSpreadSheetId,
      range: "Sheet1!A1:Z",
    });

    // Update the original "Sheet1" with the data from the "Tax Calculator" sheet
    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: originalSpreadSheetId,
      range: "Sheet1!A1", // Start from cell A1
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: values,
      },
    });
  }
}

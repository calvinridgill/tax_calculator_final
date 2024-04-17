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
    return new GoogleSheet();
  }

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

    if (!originalSpreadSheetId && !this.originalSpreadSheetId)
      throw new Error("originalSpreadSheetId is not defined");

    originalSpreadSheetId = originalSpreadSheetId || this.originalSpreadSheetId;

    newSpreadSheetId = newSpreadSheetId || (await this.createGoogleSheet());

    const response = await this.googleSheets.spreadsheets.sheets.copyTo({
      spreadsheetId: originalSpreadSheetId,
      sheetId: 0,
      requestBody: {
        destinationSpreadsheetId: newSpreadSheetId,
      },
    });

    const newSheetId = response.data.sheetId;

    await this.updateTaxCalculatorContent();

    await this.addWriterPermission(newSpreadSheetId, newUserEmail);

    return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`;
  }

  public async updateTaxCalculatorContent(): Promise<void> {
  // Fetch original spreadsheet ID
  const originalSpreadSheetId = currentEnvConfig.ORIGINAL_SPREADSHEET_ID;

  // Clear existing data
  await this.googleSheets.spreadsheets.values.clear({
    spreadsheetId: originalSpreadSheetId,
    range: "Sheet1!A1:Z",
  });

  // Fetch new data, for example, from the Product model
  const products = await Product.find({});

  // Prepare new data
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

  // Update the original sheet with new data
  await this.googleSheets.spreadsheets.values.update({
    spreadsheetId: originalSpreadSheetId,
    range: "Sheet1!C4",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: customData,
    },
  });
}

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

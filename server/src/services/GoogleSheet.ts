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

  public async copyTaxCalculatorContent(
    newUserEmail: string,
    originalSpreadSheetId?: string
  ): Promise<string> {
    // Check if originalSpreadSheetId is provided, if not use the default one
    if (!originalSpreadSheetId && !this.originalSpreadSheetId)
      throw new Error("originalSpreadSheetId is not defined");

    originalSpreadSheetId = originalSpreadSheetId || this.originalSpreadSheetId;

    // Get the product data
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

    // Clear existing data from the original sheet
    await this.googleSheets.spreadsheets.values.clear({
      spreadsheetId: originalSpreadSheetId,
      range: "Sheet1!A1:Z",
    });

    // Update the sheet with custom data
    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: originalSpreadSheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: customData,
      },
    });

    // Add writer permission for the new user
    await this.addWriterPermission(originalSpreadSheetId, newUserEmail);

    // Return the URL of the original sheet
    return `https://docs.google.com/spreadsheets/d/${originalSpreadSheetId}/edit`;
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

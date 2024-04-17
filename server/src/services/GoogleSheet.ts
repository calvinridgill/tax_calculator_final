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

  public async addCustomDataToOriginalSheet(newUserEmail: string): Promise<string> {
    const originalSpreadSheetId = this.originalSpreadSheetId;

    if (!originalSpreadSheetId)
      throw new Error("originalSpreadSheetId is not defined");

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

    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: originalSpreadSheetId,
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
      spreadsheetId: originalSpreadSheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: batchUpdateData,
      },
    });

    return `Custom data added to original spreadsheet: https://docs.google.com/spreadsheets/d/${originalSpreadSheetId}/edit`;
  }
}

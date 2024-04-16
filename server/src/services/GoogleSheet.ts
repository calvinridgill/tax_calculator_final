import { google, sheets_v4, drive_v3 } from "googleapis";
import { currentEnvConfig } from "../models/config";
import { Product } from "../models/product"; // Import your Product model

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

  await this.googleSheets.spreadsheets.values.clear({
    spreadsheetId: newSpreadSheetId,
    range: "Sheet1!A1:Z",
  });

  const products = await Product.find({});

  const customData = [
    ["Product Name", "Income", "Expense"],
  ];

  products.forEach(product => {
    const rowData: string[] = [
        product.name,
        product.income.toString(),
        product.gas.toString(),
        product.supplies.toString(),
        product.cell_phone.toString(),
        product.auto_insurance.toString(),
        product.office_expense.toString(),
        product.other_expenses.toString(),
        product.commissions_fees.toString(),
        product.auto_lease_note_payment.toString(),
        product.auto_repairs_maintenance.toString(),
        product.legal_professional_services.toString(),
    ];
    customData.push(rowData);
});

  await this.googleSheets.spreadsheets.values.update({
    spreadsheetId: newSpreadSheetId,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: customData,
    },
  });

  await this.addWriterPermission(newSpreadSheetId, newUserEmail);

  return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit#gid=${newSheetId}`;
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
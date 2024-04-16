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

  const products = await Product.find({});

  const customData: string[][] = [];

  products.forEach(product => { 
    const rowData: string[] = [
      "Income",
      "",
    ];
    customData.push(rowData);
    customData.push([
      "Gross Income",
      product.income.toString(),
    ]);
    customData.push([
      "",
      "",
    ]);
    customData.push([
      "Expense",
      "",
    ]);
    customData.push([
      "Gas",
      product.gas.toString(),
    ]);
    customData.push([
      "Supplies",
      product.supplies.toString(),
    ]);
    customData.push([
      "Cell Phone",
      product.cell_phone.toString(),
    ]);
    customData.push([
      "Auto insurance",
      product.auto_insurance.toString(),
    ]);
    customData.push([
      "Office expense",
      product.office_expense.toString(),
    ]);
    customData.push([
      "All other expenses",
      product.other_expenses.toString(),
    ]);
    customData.push([
      "Commissions and fees",
      product.commissions_fees.toString(),
    ]);
    customData.push([
      "Auto lease or note payment",
      product.auto_lease_note_payment.toString(),
    ]);
    customData.push([
      "Auto Repairs and maintenance",
      product.auto_repairs_maintenance.toString(),
    ]);
    customData.push([
      "Legal and professional services",
      product.legal_professional_services.toString(),
    ]);
    customData.push([
      "",
      "",
    ]);
    customData.push([
      "Net income",
      product.Total_Income.toString(),
    ]);
  });

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
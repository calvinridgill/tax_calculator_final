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

// Add background color to specific cells in sheet1
await this.googleSheets.spreadsheets.batchUpdate({
  spreadsheetId: newSpreadSheetId,
  requestBody: {
    requests: [
      {
        repeatCell: {
          range: {
            sheetId: 0, // Sheet1's sheetId
            startRowIndex: 3,
            endRowIndex: 4, // Only the first row
            startColumnIndex: 2,
            endColumnIndex:4, // Only the first column
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 0.0,
                green: 1.0,
                blue: 0.0,
              },
            },
          },
          fields: "userEnteredFormat.backgroundColor",
        },
      },
      {
        repeatCell: {
          range: {
            sheetId: 0, // Sheet1's sheetId
            startRowIndex: 6,
            endRowIndex: 7, // Fourth row for "Expense"
            startColumnIndex: 2,
            endColumnIndex: 3, // Only the first column
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: {
                red: 1.0,
                green: 0.0,
                blue: 0.0,
              },
            },
          },
          fields: "userEnteredFormat.backgroundColor",
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
}

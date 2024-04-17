import { google, sheets_v4, drive_v3 } from "googleapis";
import { currentEnvConfig } from "../models/config";
import { Product } from "../models/product";
import { Order } from "../models/order"; // Import your Order model

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

  private async createOrderInOrderTable(orderDetails: any): Promise<void> {
    // Create the order in the order table
    await Order.create(orderDetails);
  }

  public async copyTaxCalculatorContent(
    newUserEmail: string,
    orderDetails: any,
    originalSpreadSheetId?: string,
    newSpreadSheetId?: string
  ): Promise<string> {
    if (!originalSpreadSheetId && !this.originalSpreadSheetId)
      throw new Error("originalSpreadSheetId is not defined");

    originalSpreadSheetId = originalSpreadSheetId || this.originalSpreadSheetId;

    newSpreadSheetId = newSpreadSheetId || (await this.createGoogleSheet());

    // Create the order in the order table
    await this.createOrderInOrderTable(orderDetails);

    // Copy content to the new spreadsheet
    await this.copyContent(originalSpreadSheetId, newSpreadSheetId);

    // Update the new spreadsheet with custom data
    await this.updateSpreadsheetWithData(newSpreadSheetId);

    // Add writer permission for the new spreadsheet
    await this.addWriterPermission(newSpreadSheetId, newUserEmail);

    // Update the original spreadsheet with custom data
    await this.updateSpreadsheetWithData(originalSpreadSheetId);

    return `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}/edit`;
  }

  private async copyContent(originalSpreadSheetId: string, newSpreadSheetId: string) {
    const response = await this.googleSheets.spreadsheets.sheets.copyTo({
      spreadsheetId: originalSpreadSheetId,
      sheetId: 0,
      requestBody: {
        destinationSpreadsheetId: newSpreadSheetId,
      },
    });
  }

  private async updateSpreadsheetWithData(spreadsheetId: string): Promise<void> {
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
      ["Auto lease or note payment", products[0].auto_lease_note_payment.toString()],
      ["Auto Repairs and maintenance", products[0].auto_repairs_maintenance.toString()],
      ["Legal and professional services", products[0].legal_professional_services.toString()],
      ["", ""],
      ["Net income", products[0].Total_Income.toString()],
    ];

    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
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
      spreadsheetId: spreadsheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: batchUpdateData,
      },
    });

    await this.googleSheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 3,
                endRowIndex: 4,
                startColumnIndex: 2,
                endColumnIndex: 4,
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
                sheetId: 0,
                startRowIndex: 6,
                endRowIndex: 7,
                startColumnIndex: 2,
                endColumnIndex: 4,
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
          {
            updateSheetProperties: {
              properties: {
                sheetId: 0,
                title: "Tax Calculator",
              },
              fields: "title",
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: parseInt(cellData[0].cell.substring(1)) - 1,
                endRowIndex: parseInt(cellData[0].cell.substring(1)),
                startColumnIndex: cellData[0].cell.charCodeAt(0) - 65,
                endColumnIndex: cellData[0].cell.charCodeAt(0) - 64, 
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    fontSize: 18,
                  },
                },
              },
              fields: "userEnteredFormat.textFormat.fontSize",
            },
          },
        ],
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
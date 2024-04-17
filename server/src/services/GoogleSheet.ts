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

    // Clear existing values in the new sheet
    await this.googleSheets.spreadsheets.values.clear({
      spreadsheetId: newSpreadSheetId,
      range: "Sheet1!A1:Z",
    });

    // Retrieve original sheet formulas
    const originalFormulas = await this.getOriginalSheetFormulas(originalSpreadSheetId);

    // Apply the formulas to the corresponding cells in the new sheet
    for (let rowIndex = 0; rowIndex < originalFormulas.length; rowIndex++) {
      for (let colIndex = 0; colIndex < originalFormulas[rowIndex].length; colIndex++) {
        const formula = originalFormulas[rowIndex][colIndex];
        if (formula) {
          const range = `Sheet1!${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
          await this.googleSheets.spreadsheets.batchUpdate({
            spreadsheetId: newSpreadSheetId,
            requestBody: {
              requests: [
                {
                  pasteData: {
                    data: `=${formula}`,
                    coordinate: {
                      sheetId: 0,
                      rowIndex: rowIndex,
                      columnIndex: colIndex,
                    },
                    type: "PASTE_FORMULA",
                    delimiter: ",",
                  },
                },
              ],
            },
          });
        }
      }
    }

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

  private async getOriginalSheetFormulas(spreadsheetId: string): Promise<string[][]> {
    const response = await this.googleSheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
      ranges: ["Sheet1!A1:Z"],
    });

    // Extract formulas from the original sheet
    const originalValues = response.data.sheets[0].data[0].rowData;
    const originalFormulas = [];
    if (originalValues) {
      for (const row of originalValues) {
        const rowFormulas = [];
        if (row.values) {
          for (const cell of row.values) {
            if (cell && cell.userEnteredValue && cell.userEnteredValue.formulaValue) {
              rowFormulas.push(cell.userEnteredValue.formulaValue);
            } else {
              rowFormulas.push(null);
            }
          }
        }
        originalFormulas.push(rowFormulas);
      }
    }

    return originalFormulas;
  }
}

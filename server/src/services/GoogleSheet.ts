import { google, sheets_v4, drive_v3 } from "googleapis";
import { currentEnvConfig } from "../models/config";
import { Product } from "../models/product";

class GoogleSheet {
  private static client;
  private googleSheets: sheets_v4.Sheets;
  private originalSpreadSheetId: string;

  constructor() {
    this.googleSheets = google.sheets({
      version: "v4",
      auth: GoogleSheet.client,
    });
    this.originalSpreadSheetId = currentEnvConfig.ORIGINAL_SPREADSHEET_ID;
  }

  private static async initializeClient() {
    if (!GoogleSheet.client) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "tax-calculator-new-391013-37b0d1adaaf9.json",
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
      GoogleSheet.client = await auth.getClient();
    }
  }

  static async createInstance() {
    await GoogleSheet.initializeClient();
    return new GoogleSheet();
  }

  async addCustomDataToOriginalSheet(customData: any[][]): Promise<void> {
    await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: this.originalSpreadSheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: customData,
      },
    });
  }

  async addWriterPermission(
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

// Example usage
(async () => {
  try {
    const googleSheet = await GoogleSheet.createInstance();
    
    // Fetch custom data
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

    // Add custom data to the original sheet
    await googleSheet.addCustomDataToOriginalSheet(customData);

    // Add permission to the original spreadsheet
    await googleSheet.addWriterPermission(currentEnvConfig.ORIGINAL_SPREADSHEET_ID, "newUser@example.com");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

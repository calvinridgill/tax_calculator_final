import { config } from "dotenv"
config({ path: "../../.env" })
import { google } from "googleapis"
// ;(async () => {
//   try {

//     const auth = new google.auth.GoogleAuth({
//       keyFile: "../../tax-calculator-387602-7637de9962d4.json",
//       scopes: [
//         "https://www.googleapis.com/auth/drive",
//         "https://www.googleapis.com/auth/drive.file",
//         "https://www.googleapis.com/auth/spreadsheets",
//       ],
//     })
//     const client = await auth.getClient()
//     const url = await createNewGoogleSheet(client)
//     console.log("----> url: ", url)
//   } catch (error) {
//     console.log("=-====> ", error)
//   }
// })()
// Step 3: Generate a new Google Sheet
async function createNewGoogleSheet(auth: any): Promise<string> {
  const sheets = google.sheets({ version: "v4", auth })

  const spreadsheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: "Ramz Hamz ",
      },
    },
  })

  const drive = google.drive({ version: "v3", auth })
  await drive.permissions.create({
    fileId: spreadsheet.data.spreadsheetId,
    requestBody: {
      role: "writer",
      type: "user",
      emailAddress: process.env.CALVIN_EMAIL,
    },
  })
  console.log("Spreadsheet url:", spreadsheet.data.spreadsheetUrl)
  return spreadsheet.data.spreadsheetId
}

// Step 4: Copy the tax calculator content
async function copyTaxCalculatorContent(
  auth: any,
  originalSpreadSheetId: string,
  newSpreadSheetId: string,
): Promise<string> {
  const sheets = google.sheets({ version: "v4", auth })

  const response = await sheets.spreadsheets.sheets.copyTo({
    spreadsheetId: originalSpreadSheetId,
    sheetId: 0, // Assuming the first sheet contains the tax calculator content
    requestBody: {
      destinationSpreadsheetId: newSpreadSheetId,
    },
  })
  const newSheetId = response.data.sheetId
  // delete the default sheet
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: newSpreadSheetId,
    requestBody: {
      requests: [
        {
          deleteSheet: {
            sheetId: 0,
          },
        },
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
  })

  return `${newSpreadSheetId}/edit#gid=${newSheetId}`
}

// // Authenticate and call the functions
async function automateGenerationOfGoogleSheetLink() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "../../tax-calculator-387602-7637de9962d4.json",
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  })

  try {
    const originalSheetId = process.env.ORIGINAL_SPREADSHEET_ID

    const newSheetId = await createNewGoogleSheet(auth)
    const newSpreadSheetId = await copyTaxCalculatorContent(
      auth,
      originalSheetId,
      newSheetId,
    )
    console.log(
      "newSpreadSheetId---<>>>",
      `https://docs.google.com/spreadsheets/d/${newSpreadSheetId}`,
    )
  } catch (error) {
    console.error("Error automating generation of Google Sheet link:", error)
  }
}

automateGenerationOfGoogleSheetLink()
  .then(() => {
    console.log("done")
  })
  .catch((error) => {
    console.log("error", error)
  })

// create an orginal spreadsheet with all the formula and evertyhing(add protection to the formulas fields)
// give access of the original spreadsheet to service account
// copy the original spreadsheet id to the environment variable
// then the code will take care of the res

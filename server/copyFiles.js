const fs = require("fs-extra")

console.log("Starting file copy...")
try {
  fs.copySync("src/emailTemplates", "build/emailTemplates")
  console.log("File copy complete.")
} catch (err) {
  console.error("Error copying files:", err)
}

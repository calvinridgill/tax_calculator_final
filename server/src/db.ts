import mongoose from "mongoose"

const PORT = process.env.PORT || 9090
async function openMongooseConnection(DB_URL = null): Promise<void> {
  await mongoose.connect(DB_URL || process.env.DB_URL)
  console.log("Mongoose connection opened successfully")
}

async function closeMongooseConnection(): Promise<void> {
  await mongoose.connection.close()
  console.log("Mongoose connection closed successfully")
}

export { openMongooseConnection, closeMongooseConnection, mongoose, PORT }

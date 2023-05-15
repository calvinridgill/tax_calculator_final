import mongoose from "mongoose"
import { AppError } from "../utils/AppError"

interface IError {
  timeStamp: Date
  message: string
  stackTrace: string
  requestURL: string
  requestMethod: string
  requestPayload: object
  userID: string
}

const ErrorSchema = new mongoose.Schema<IError>(
  {
    timeStamp: { type: Date, default: Date.now },
    message: {
      type: String,
      required: true,
    },
    stackTrace: {
      type: String,
      required: true,
    },
    requestURL: {
      type: String,
    },
    requestMethod: {
      type: String,
    },
    requestPayload: {
      type: Object,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true },
)

export const Error = mongoose.model<IError>("Error", ErrorSchema)

export const saveError = async (error: AppError) => {
  try {
    if (!(error instanceof global.Error)) return
    const payload = {
      message: error.message,
      stackTrace: error.stack,
      requestURL: error.requestURL,
      requestPayload: error.requestPayload,
      userID: error.userID,
    }
    const err = new Error(payload)
    await err.save()
    if (process.env.NODE_ENV === "development") console.log(payload)
  } catch (error) {
    console.log(
      "error happening while saving error, this is the error of error",
    )
  }
}

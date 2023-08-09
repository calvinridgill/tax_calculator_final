import mongoose from "mongoose"

interface IMessage {
  firstname: string
  lastname: string
  phone: string
  message: string
  read: boolean
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Message = mongoose.model<IMessage>("Message", messageSchema)

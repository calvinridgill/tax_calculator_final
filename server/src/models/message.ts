import mongoose from "mongoose"

interface IMessage {
  firstname: string
  lastname: string
  phone: string
  message: string
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
  },
  { timestamps: true },
)

export const Message = mongoose.model<IMessage>("Message", messageSchema)

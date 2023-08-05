import { Request, Response, NextFunction } from "express"

function getAMessage(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send("get a message")
  } catch (error) {
    next(error)
  }
}

function getAllMessages(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send("get all messages")
  } catch (error) {
    next(error)
  }
}

function createMessage(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send("create a message")
  } catch (error) {
    next(error)
  }
}

function updateMessage(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send("update a message")
  } catch (error) {
    next(error)
  }
}

function deleteMessage(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send("delete message")
  } catch (error) {
    next(error)
  }
}

export default {
  getAMessage,
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}

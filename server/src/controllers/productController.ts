import { Request, Response, NextFunction } from "express"
import { Product } from "../models/product"
import multer from "multer"
import sharp from "sharp"
import fs from "fs/promises"
import * as fsNonProm from "fs"
import path from "path"
import { currentEnvConfig } from "../models/config"

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, income, cell_phone,gas,auto_repairs_maintenance,commissions_fees,auto_insurance,legal_professional_services,office_expense,other_expenses,supplies,auto_lease_note_payment,extraIncome,tax } = req.body
    // const image = req.file?.filename

    if (!name || !description || !income ) {
      return res.status(400).json({
        status: "failed",
        message: "name, description, income required",
      })
    }

    const totalExpenses = parseInt(cell_phone) +
    parseInt(gas) +
    parseInt(auto_repairs_maintenance) +
    parseInt(commissions_fees) +
    parseInt(auto_insurance)+
    parseInt(legal_professional_services) +
    parseInt(office_expense) +
    parseInt(other_expenses) +
    parseInt(supplies) +
    parseInt(auto_lease_note_payment)

    console.log("totalExpenses",totalExpenses)
    

    const netIncome = income - totalExpenses

    const Self_Employment_Income = netIncome
    const Self_Employment_Social_Security_Tax = 4541.6
    const Income_Tax_On_Self_Employment = 1200.28
    const Less_Tax_Witheld_W_2_Box_4 = 6000
    const W_2_Wages_Add_All_Box_2_on_W_2 = extraIncome
    const Total_Income = parseInt(W_2_Wages_Add_All_Box_2_on_W_2) + Self_Employment_Income
    const Tax_on_W_2_Wages = tax
    const Total_Tax_Owed = parseInt(Tax_on_W_2_Wages) + Self_Employment_Social_Security_Tax
    const Total_Taxes_Owed_Refund = Total_Tax_Owed - Less_Tax_Witheld_W_2_Box_4

    const Total_Tax_on_Self_Employement_Income_and_Social_Security_Tax = Self_Employment_Social_Security_Tax + Income_Tax_On_Self_Employment 
    const dataIncome = netIncome - Total_Tax_on_Self_Employement_Income_and_Social_Security_Tax
    console.log("dataIncome",dataIncome)

    const product = await Product.create({
      name,
      description,
      income,
      cell_phone,
      gas,
      auto_repairs_maintenance,
      commissions_fees,
      auto_insurance,
      legal_professional_services,
      office_expense,
      other_expenses,
      supplies,
      auto_lease_note_payment,
      totalExpenses,
      netIncome,
      Self_Employment_Social_Security_Tax,
      Income_Tax_On_Self_Employment,
      Total_Tax_on_Self_Employement_Income_and_Social_Security_Tax,
      dataIncome,
      extraIncome,
      tax,
      Self_Employment_Income,
      W_2_Wages_Add_All_Box_2_on_W_2,
      Total_Income,
      Tax_on_W_2_Wages,
      Total_Tax_Owed,
      Less_Tax_Witheld_W_2_Box_4,
      Total_Taxes_Owed_Refund
    })
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id
    if (req.file) {
      const product = await Product.findById(productId)
      const productImages = null
      if (productImages)
        Promise.all(
          productImages.map((image) => {
            const absolutImageLocation = getImageAbsoluteLocation(image)
            if (fsNonProm.existsSync(absolutImageLocation))
              return fs.unlink(absolutImageLocation)
          }),
        ).catch((error) => {
          next(error)
        })
      req.body.images = [getFullImageUrl(req.file.filename)]
    }
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res
        .status(404)
        .send({ status: "error", message: "Product not found" })
    }
    res.status(200).send({ status: "success", data: product })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const game = await Product.findById(req.params.id)
    // delete the game image
    const productImages = null
    if (productImages)
      Promise.all(
        productImages.map((image) => {
          const absolutImageLocation = getImageAbsoluteLocation(image)
          if (fsNonProm.existsSync(absolutImageLocation))
            return fs.unlink(absolutImageLocation)
        }),
      )
    await Product.findByIdAndDelete(req.params.id)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb("file should be only image", false)
  }
}
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
})

export const uploadPhoto = upload.single("image")

export const resizePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) return next()

    req.file.filename = `product-${Date.now()}.jpeg`

    // check if public/images/product folder exists, if not create it
    if (!fsNonProm.existsSync("public/imgs/product"))
      fsNonProm.mkdirSync("public/imgs/product", { recursive: true })

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/imgs/product/${req.file.filename}`)

    next()
  } catch (error) {
    next(error)
  }
}

function getFullImageUrl(url: string) {
  return `${currentEnvConfig.SERVER_URL}/imgs/product/${url}`
}

function getImageAbsoluteLocation(fullImageUrl: string) {
  const imgLocationInPublic = fullImageUrl.replace(
    `${currentEnvConfig.SERVER_URL}`,
    "public/",
  )
  return path.resolve(imgLocationInPublic)
}

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
    const { name, description, price } = req.body
    const image = req.file?.filename

    if (!name || !description || !price || !image) {
      return res.status(400).json({
        status: "failed",
        message: "name, description, price, and image required",
      })
    }

    const product = await Product.create({
      name,
      description,
      price,
      images: [getFullImageUrl(image)],
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
      const productImages = product?.images
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
    const productImages = game?.images
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

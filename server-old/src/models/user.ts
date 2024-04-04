import crypto from "crypto"
import mongoose, { Model, HydratedDocument } from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

interface IUser {
  firstName: string
  lastName?: string
  email: string
  password?: string
  phone?: string
  image?: string
  role: "user" | "guide" | "lead-guide" | "admin"
  passwordChangedAt?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  active?: boolean
  generatedPassword?: string
}
interface IUserMethods {
  correctPassword: (
    candidatePassword: string,
    userPassword: string,
  ) => Promise<boolean>
  changedPasswordAfter: (JWTTimestamp: number) => boolean
  createPasswordResetToken: () => string
}

type IUserModel = Model<IUser, any, IUserMethods>

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    lastName: String,
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: String,
    image: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    generatedPassword: {
      type: String,
      minlength: 6,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true },
)

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next()

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next()
})

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()

  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000 + "",
      10,
    )

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

export const User = mongoose.model<IUser, IUserModel>("User", userSchema)
export type UserType = HydratedDocument<IUser, IUserMethods>

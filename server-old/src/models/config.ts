import mongoose, { Model } from "mongoose"

interface IConfig {
  EMAIL_FROM: string
  CLIENT_APP_URL: string
  SERVER_URL: string
  ORIGINAL_SPREADSHEET_ID: string
  CALVIN_NAME: string
  SENDGRID_PASSWORD: string
  SENDGRID_USERNAME?: string
  COMPANY_NAME?: string
  STRIPE_API_KEY: string
  STRIPE_END_POINT_SECRET: string
  SERVICE_ACCOUNT_EMAIL?: string
  NODE_ENV: string
}

type IConfigModel = Model<IConfig>

const configSchema = new mongoose.Schema<IConfig, IConfigModel>({
  EMAIL_FROM: {
    type: String,
    required: [
      true,
      "Please provide a your email you used to create your SendGrid account",
    ],
  },
  CLIENT_APP_URL: {
    type: String,
    required: [true, "Please provide a front end base url"],
  },
  SERVER_URL: {
    type: String,
    required: [true, "Please provide a back end base url"],
  },
  ORIGINAL_SPREADSHEET_ID: {
    type: String,
    required: [true, "Please provide a ORIGINAL_SPREADSHEET_ID"],
  },
  CALVIN_NAME: {
    type: String,
    default: "Calvin",
  },
  SENDGRID_PASSWORD: {
    type: String,
    required: [
      true,
      "Please provide a your password for your SendGrid account",
    ],
  },
  SENDGRID_USERNAME: {
    type: String,
    default: "apikey",
  },
  COMPANY_NAME: {
    type: String,
    default: "EZ Tax Calculator",
  },
  STRIPE_API_KEY: {
    type: String,
    required: [true, "Please provide a STRIPE_API_KEY"],
  },
  STRIPE_END_POINT_SECRET: {
    type: String,
    required: [true, "Please provide a STRIPE_END_POINT_SECRET"],
  },
  SERVICE_ACCOUNT_EMAIL: String,
  NODE_ENV: String,
})

configSchema.post("findOneAndUpdate", async function (doc) {
  await loadConfig()
})

export const Config = mongoose.model<IConfig, IConfigModel>(
  "Config",
  configSchema,
)

export let currentEnvConfig: IConfig
export async function loadConfig() {
  try {
    const environment = process.env.NODE_ENV || "production"
    const res = await Config.findOne({ NODE_ENV: environment })
    if (res) currentEnvConfig = res.toObject()
  } catch (error) {
    console.log("error in loading config ", error)
  }
}

loadConfig()

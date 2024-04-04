import mongoose, { Schema } from "mongoose"

interface IProduct {
  name: string
  description: string
  income: number
  cell_phone: number
  gas: number
  auto_repairs_maintenance: number
  commissions_fees: number
  auto_insurance: number
  legal_professional_services: number
  office_expense: number
  other_expenses: number
  supplies: number
  auto_lease_note_payment: number
  totalExpenses : number
  netIncome : number
  Self_Employment_Social_Security_Tax : number
  Income_Tax_On_Self_Employment : number
  Total_Tax_on_Self_Employement_Income_and_Social_Security_Tax : number
  dataIncome : number
  extraIncome : number
  tax : number
  Self_Employment_Income : number
  W_2_Wages_Add_All_Box_2_on_W_2 : number
  Total_Income : number
  Tax_on_W_2_Wages : number
  Total_Tax_Owed : number
  Less_Tax_Witheld_W_2_Box_4 : number
  Total_Taxes_Owed_Refund : number
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    income: {
      type: Number,
      required: true,
    },
    cell_phone: {
      type: Number,
      required: true,
    },
    gas: {
      type: Number,
      required: true,
    },
    auto_repairs_maintenance: {
      type: Number,
      required: true,
    },
    commissions_fees: {
      type: Number,
      required: true,
    },
    auto_insurance: {
      type: Number,
      required: true,
    },
    legal_professional_services: {
      type: Number,
      required: true,
    },
    office_expense: {
      type: Number,
      required: true,
    },
    other_expenses: {
      type: Number,
      required: true,
    },
    supplies: {
      type: Number,
      required: true,
    },
    auto_lease_note_payment: {
      type: Number,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
    netIncome: {
      type: Number,
      required: true,
    },
    Self_Employment_Social_Security_Tax: {
      type: Number,
      required: true,
    },
    Income_Tax_On_Self_Employment: {
      type: Number,
      required: true,
    },
    Total_Tax_on_Self_Employement_Income_and_Social_Security_Tax : {
      type: Number,
      required: true,
    },
    dataIncome: {
      type: Number,
      required: true,
    },
    extraIncome: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    Self_Employment_Income : {
      type : Number,
      required: true
    },
    W_2_Wages_Add_All_Box_2_on_W_2 : {
      type : Number,
      required : true
    },
    Total_Income : {
      type : Number,
      required : true
    },
    Tax_on_W_2_Wages : {
      type : Number,
      required : true
    },
    Total_Tax_Owed : {
      type : Number,
      required : true
    },
    Less_Tax_Witheld_W_2_Box_4 : {
      type : Number,
      required : true
    },
    Total_Taxes_Owed_Refund : {
      type : Number,
      required : true
    }
  },
  { timestamps: true },
)

export const Product = mongoose.model<IProduct>("Product", productSchema)

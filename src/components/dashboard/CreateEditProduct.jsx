import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography, Button } from "@mui/material";
import "./CreateEditProduct.css";

export function CreateEditProduct({ defaultValues, disabled = false }) {
  // const [productImage, setProductImage] = useState(
  //   defaultValues?.images[0] || "/images/image-loading-error.jpg"
  // );
  const [cellPhone, setCellPhone] = useState(0);
  const [gas, setGas] = useState(0);
  const [autoRepairs, setAutoRepairs] = useState(0);
  const [commissionsFees, setCommissionsFees] = useState(0);
  const [autoInsurance, setAutoInsurance] = useState(0);
  const [legalServices, setLegalServices] = useState(0);
  const [officeExpense, setOfficeExpense] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [supplies, setSupplies] = useState(0);
  const [autoLease, setAutoLease] = useState(0);
  const [extraIncome, setExtraIncome] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);

  console.log("extraIncome", extraIncome);

  const handleChange = (e) => {
    const salary = parseInt(e.target.value);

    console.log("salary", salary);

    let tax = 0;

    if (salary <= 10000) {
      tax = 0;
    } else if (salary <= 15000) {
      tax = 246;
    } else if (salary <= 20000) {
      tax = 748;
    } else if (salary <= 25000) {
      tax = 1298;
    } else if (salary <= 30000) {
      tax = 1898;
    } else if (salary <= 35000) {
      tax = 2498;
    } else if (salary <= 40000) {
      tax = 3098;
    } else if (salary <= 45000) {
      tax = 3698;
    } else if (salary <= 50000) {
      tax = 4298;
    } else if (salary <= 55000) {
      tax = 5093;
    } else if (salary <= 60000) {
      tax = 6193;
    } else if (salary <= 65000) {
      tax = 7293;
    } else if (salary <= 70000) {
      tax = 8393;
    } else if (salary <= 75000) {
      tax = 9493;
    } else if (salary <= 80000) {
      tax = 10593;
    } else if (salary <= 85000) {
      tax = 11693;
    } else if (salary <= 90000) {
      tax = 12793;
    } else if (salary <= 95000) {
      tax = 13893;
    } else {
      tax = 15015;
    }

    setTax(tax);
  };

  const calculateTotalExpenses = () => {
    return (
      cellPhone +
      gas +
      autoRepairs +
      commissionsFees +
      autoInsurance +
      legalServices +
      officeExpense +
      otherExpenses +
      supplies +
      autoLease
    );
  };

  // Function to handle button click
  const handleButtonClick = () => {
    const total = calculateTotalExpenses();
    setTotalExpenses(total);
  };

  const calculateNetIncome = () => {
    return grossIncome - totalExpenses;
  };

  const handleNetIncomeButtonClick = () => {
    const net = calculateNetIncome();
    setNetIncome(net);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        py: 4,
      }}
    >
      <TextField
        label="Title"
        name="name"
        required
        defaultValue={defaultValues?.name}
        disabled={disabled}
      />
      <TextField
        label="Description"
        name="description"
        required
        multiline
        maxRows={5}
        minRows={3}
        defaultValue={defaultValues?.description}
        disabled={disabled}
      />
      <TextField
        label="Gross Income"
        name="income"
        required
        type="number"
        defaultValue={defaultValues?.income}
        disabled={disabled}
        onChange={(e) => setGrossIncome(parseInt(e.target.value))}
      />
      <Typography variant="h6">Other Expenses</Typography>
      <TextField
        label="Cell Phone"
        name="cell_phone"
        required
        type="number"
        defaultValue={defaultValues?.cell_phone}
        disabled={disabled}
        onChange={(e) => setCellPhone(parseInt(e.target.value))}
      />
      <TextField
        label="Gas"
        name="gas"
        required
        type="number"
        defaultValue={defaultValues?.gas}
        disabled={disabled}
        onChange={(e) => setGas(parseInt(e.target.value))}
      />
      <TextField
        label="Auto Repairs and maintenance"
        name="auto_repairs_maintenance"
        required
        type="number"
        defaultValue={defaultValues?.auto_repairs_maintenance}
        disabled={disabled}
        onChange={(e) => setAutoRepairs(parseInt(e.target.value))}
      />
      <TextField
        label="Commissions and fees"
        name="commissions_fees"
        required
        type="number"
        defaultValue={defaultValues?.commissions_fees}
        disabled={disabled}
        onChange={(e) => setCommissionsFees(parseInt(e.target.value))}
      />
      <TextField
        label="Auto insurance"
        name="auto_insurance"
        required
        type="number"
        defaultValue={defaultValues?.auto_insurance}
        disabled={disabled}
        onChange={(e) => setAutoInsurance(parseInt(e.target.value))}
      />
      <TextField
        label="Legal and professional services"
        name="legal_professional_services"
        required
        type="number"
        defaultValue={defaultValues?.legal_professional_services}
        disabled={disabled}
        onChange={(e) => setLegalServices(parseInt(e.target.value))}
      />
      <TextField
        label="Office expense"
        name="office_expense"
        required
        type="number"
        defaultValue={defaultValues?.office_expense}
        disabled={disabled}
        onChange={(e) => setOfficeExpense(parseInt(e.target.value))}
      />
      <TextField
        label="All other expenses"
        name="other_expenses"
        required
        type="number"
        defaultValue={defaultValues?.other_expenses}
        disabled={disabled}
        onChange={(e) => setOtherExpenses(parseInt(e.target.value))}
      />
      <TextField
        label="Supplies"
        name="supplies"
        required
        type="number"
        defaultValue={defaultValues?.supplies}
        disabled={disabled}
        onChange={(e) => setSupplies(parseInt(e.target.value))}
      />
      <TextField
        label="Auto lease or note payment"
        name="auto_lease_note_payment"
        required
        type="number"
        defaultValue={defaultValues?.auto_lease_note_payment}
        disabled={disabled}
        onChange={(e) => setAutoLease(parseInt(e.target.value))}
      />
      {/*------------- Expenses Section --------------*/}
      <div className="section">
        <Button variant="outlined" onClick={handleButtonClick}>
          Total Expenses
        </Button>
        <h4 className="h4">{totalExpenses}</h4>
      </div>
      {/*------------- Expenses Section --------------*/}

      {/*------------- NetIncome Section --------------*/}
      <div className="section">
        <Button variant="outlined" onClick={handleNetIncomeButtonClick}>
          Net Income
        </Button>
        <h4 className="h4">{netIncome}</h4>
      </div>
      {/*------------- NetIncome Section --------------*/}
      <Typography variant="h6">Extra Work Income(W-2 Wages)</Typography>
      <TextField
        label="Extra Income"
        name="extraIncome"
        required
        type="number"
        defaultValue={defaultValues?.extraIncome}
        disabled={disabled}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <div className="section">
        <h3>Extra Income Tax(W-2 Wages)</h3>
        <TextField
          name="tax"
          value={tax}
          defaultValue={defaultValues?.tax}
          disabled={disabled}
        >
          {tax}
        </TextField>
      </div>
      <div className="mt-5"></div>
    </Box>
  );
}

CreateEditProduct.propTypes = {
  // defaultValues props listing name, description,price, and image
  defaultValues: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    income: PropTypes.number,
    cell_phone: PropTypes.number,
    gas: PropTypes.number,
    auto_repairs_maintenance: PropTypes.number,
    commissions_fees: PropTypes.number,
    auto_insurance: PropTypes.number,
    legal_professional_services: PropTypes.number,
    office_expense: PropTypes.number,
    other_expenses: PropTypes.number,
    supplies: PropTypes.number,
    auto_lease_note_payment: PropTypes.number,
    extraIncome: PropTypes.number,
    tax: PropTypes.number,
  }),
  disabled: PropTypes.bool,
};

import { parseDataFromExcel } from "./parseData";
import { join } from "path";
import { Customer, CustomerAttributes } from "../models/customerModel";
import { Loan, LoanAttributes } from "../models/loanModel";

export const addToDb = async () => {
  await Promise.all([
    Customer.destroy({ truncate: true }),
    Loan.destroy({ truncate: true }),
  ]);

  const customerParsedData = await parseDataFromExcel(
    join(__dirname, "..", "..", "pdfs", "customer_data.xlsx")
  );

  customerParsedData.shift();

  const customerData: CustomerAttributes[] = [];

  customerParsedData.forEach((row: any) => {
    customerData.push({
      customer_id: row[0],
      first_name: row[1],
      last_name: row[2],
      age: row[3],
      phone_number: row[4],
      monthly_salary: row[5],
      approved_limit: row[6],
      current_debt: row[7],
    });
  });

  const loanParsedData = await parseDataFromExcel(
    join(__dirname, "..", "..", "pdfs", "loan_data.xlsx")
  );

  loanParsedData.shift();

  const loanData: LoanAttributes[] = [];

  // Add data to database
  loanParsedData.forEach((row: any, index: number) => {
    loanData.push({
      customer_id: parseInt(row[0]),
      loan_id: parseInt(row[1]),
      loan_amount: parseFloat(row[2]),
      tenure: parseInt(row[3]),
      interest_rate: parseFloat(row[4]),
      monthly_repayment: parseFloat(row[5]),
      emis_paid_on_time: parseInt(row[6]),
      start_date: new Date(row[7]),
      end_date: new Date(new Date(row[8]).setHours(23, 59, 59, 999)),
      amount_including_interest: parseFloat(row[5]) * parseInt(row[3]),
    });
  });

  await Promise.all([
    Customer.bulkCreate(customerData),
    Loan.bulkCreate(loanData),
  ]);

  console.log("Data added to database");
};

import { Request, Response } from "express";
import { CustomerCreationAttributes } from "../models/customerModel";
import customerRepository from "../repositories/customer.repository";
import { ActionSuccessHandler } from "../common/responses";

export const registerCustomer = async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    age,
    monthly_income,
    phone_number,
    approved_limit,
    current_debt,
  } = req.body as {
    first_name: string;
    last_name: string;
    age: number;
    monthly_income: number;
    phone_number: string;
    current_debt: number;
    approved_limit: number;
  };

  const newCustomer = await customerRepository.createCustomer({
    first_name,
    last_name,
    age,
    monthly_salary: monthly_income,
    phone_number,
  } as CustomerCreationAttributes);

  return new ActionSuccessHandler(res, "Customer registered successfully", {
    customer: newCustomer,
  });
};

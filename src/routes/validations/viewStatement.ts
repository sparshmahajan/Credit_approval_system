import { param } from "express-validator";

export const viewStatementValidation = [
  param("customer_id").isInt({ min: 0 }).withMessage("Invalid customer id"),
  param("loan_id").isInt({ min: 0 }).withMessage("Invalid loan id"),
];

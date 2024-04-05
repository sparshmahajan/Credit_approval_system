import { param } from "express-validator";

export const viewLoanValidation = [
  param("loan_id").isInt({ min: 0 }).withMessage("Invalid loan id"),
];

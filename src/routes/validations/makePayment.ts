import { param, body } from "express-validator";

export const makePaymentValidation = [
  param("loan_id").isInt({ min: 1 }).withMessage("Invalid loan_id"),
  param("customer_id").isInt({ min: 1 }).withMessage("Invalid customer_id"),
  body("amount").isInt({ min: 1 }).withMessage("Invalid amount"),
  body("paid_on_time").isBoolean().withMessage("Invalid paid_on_time"),
];

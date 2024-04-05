import { body } from "express-validator";

export const checkEligibilityValidation = [
  body("customer_id").isInt({ min: 1 }).withMessage("Invalid customer_id"),
  body("loan_amount").isInt({ min: 1 }).withMessage("Invalid loan_amount"),
  body("interest_rate")
    .isFloat({ min: 0 })
    .withMessage("Invalid interest_rate"),
  body("tenure").isInt({ min: 1 }).withMessage("Invalid tenure"),
];

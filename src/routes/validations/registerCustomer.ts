import { body } from "express-validator";

export const registerCustomerValidation = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("age").notEmpty().withMessage("Age is required"),
  body("age")
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18 years old"),
  body("monthly_income").notEmpty().withMessage("Monthly income is required"),
  body("monthly_income")
    .isInt({ min: 1 })
    .withMessage("Monthly income must be at least 1"),
  body("phone_number").customSanitizer((value) => {
    if (typeof value === "number") {
      return value.toString();
    }
    return value;
  }),
  body("phone_number")
    .isMobilePhone("en-IN")
    .withMessage("Phone number is required"),
];

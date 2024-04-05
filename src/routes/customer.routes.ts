import express from "express";
const router = express.Router();

import validations from "./validations";
import { validateRequest } from "../middlewares";
import controllers from "../controllers";
import { NotFoundError } from "../common/errors";

router.post(
  "/register",
  validations.registerCustomerValidation,
  validateRequest,
  controllers.registerCustomer
);

router.get(
  "/view-loan/:loan_id",
  validations.viewLoanValidation,
  validateRequest,
  controllers.viewLoan
);

router.get(
  "/view-statement/:customer_id/:loan_id",
  validations.viewStatementValidation,
  validateRequest,
  controllers.viewStatement
);

router.post(
  "/check-eligibility",
  validations.checkEligibilityValidation,
  validateRequest,
  controllers.checkEligibility
);

router.post(
  "/create-loan",
  validations.createLoanValidation,
  validateRequest,
  controllers.createLoan
);

router.post(
  "/make-payment/:customer_id/:loan_id",
  validations.makePaymentValidation,
  validateRequest,
  controllers.makePayment
);

router.get("/add-data", controllers.addDataToTables);

router.use("*", (_req, _res) => {
  throw new NotFoundError("Route not found");
});
export { router as customerRoutes };

import { Request, Response } from "express";
import { loanRepository } from "../repositories/loan.repository";
import { EntryFoundHandler } from "../common/responses";

export const viewStatement = async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.customer_id);
  const loanId = parseInt(req.params.loan_id);

  const statement = await loanRepository.getStatement(customerId, loanId);

  if (!statement) {
    new EntryFoundHandler(res, "Statement not found", {}, 404);
    return;
  }

  new EntryFoundHandler(res, "Statement found", { statement });
};

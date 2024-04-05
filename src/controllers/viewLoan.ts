import { Request, Response } from "express";
import { loanRepository } from "../repositories/loan.repository";
import { EntryFoundHandler } from "../common/responses";

export const viewLoan = async (req: Request, res: Response) => {
  const loanId = parseInt(req.params.loan_id);

  const loan = await loanRepository.getLoanById(loanId);

  if (!loan) {
    new EntryFoundHandler(res, "Loan not found", {}, 404);
    return;
  }

  return new EntryFoundHandler(res, "Loan found", { loan });
};

import { Request, Response } from "express";
import { loanRepository } from "../repositories/loan.repository";
import { ActionSuccessHandler } from "../common/responses";

export const makePayment = async (req: Request, res: Response) => {
  const loan_id: number = parseInt(req.params.loan_id);
  const customer_id: number = parseInt(req.params.customer_id);

  const { amount, paid_on_time } = req.body as {
    amount: number;
    paid_on_time: boolean;
  };

  const loan = await loanRepository.makePayment(
    loan_id,
    customer_id,
    amount,
    paid_on_time
  );

  return new ActionSuccessHandler(res, "Payment successful", {
    loan,
  });
};

import { Request, Response } from "express";
import { loanRepository } from "../repositories/loan.repository";
import { ActionSuccessHandler } from "../common/responses";

export const createLoan = async (req: Request, res: Response) => {
  const { customer_id, loan_amount, interest_rate, tenure } = req.body as {
    customer_id: number;
    loan_amount: number;
    interest_rate: number;
    tenure: number;
  };

  const creditScore = await loanRepository.getCreditScore(customer_id);

  if (creditScore < 10) {
    return new ActionSuccessHandler(res, "Loan not approved", {
      data: {
        message: "Credit score is too low",
        loan_approved: false,
      },
    });
  }

  if (creditScore < 50 && creditScore >= 30 && interest_rate < 12) {
    return new ActionSuccessHandler(res, "Loan not approved", {
      data: {
        message: "Interest rate is too low",
        loan_approved: false,
      },
    });
  }

  if (creditScore < 30 && creditScore >= 10 && interest_rate < 16) {
    return new ActionSuccessHandler(res, "Loan not approved", {
      data: {
        message: "Interest rate is too low",
        loan_approved: false,
      },
    });
  }

  const newLoan = await loanRepository.createLoan({
    customer_id,
    loan_amount,
    interest_rate,
    tenure,
  });

  return new ActionSuccessHandler(res, "Loan approved", {
    loan: {
      loan_approved: true,
      ...newLoan.toJSON(),
    },
  });
};

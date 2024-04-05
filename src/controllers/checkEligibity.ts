import { Request, Response } from "express";
import { loanRepository } from "../repositories/loan.repository";
import { ActionSuccessHandler } from "../common/responses";

export const checkEligibility = async (req: Request, res: Response) => {
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
        approval: false,
      },
    });
  }

  if (creditScore > 50) {
    return new ActionSuccessHandler(res, "Loan approved", {
      data: {
        approval: true,
        customer_id,
        loan_amount,
        interest_rate,
        tenure,
        corrected_interest_rate: interest_rate,
      },
    });
  }

  if (creditScore < 50 && creditScore >= 30) {
    return new ActionSuccessHandler(res, "Loan will get approved", {
      data: {
        approval: true,
        customer_id,
        loan_amount,
        interest_rate,
        tenure,
        corrected_interest_rate: interest_rate > 12 ? interest_rate : 12,
      },
    });
  }

  return new ActionSuccessHandler(res, "Loan will get approved", {
    data: {
      approval: true,
      customer_id,
      loan_amount,
      interest_rate,
      tenure,
      corrected_interest_rate: interest_rate > 16 ? interest_rate : 16,
    },
  });
};

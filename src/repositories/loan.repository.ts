import { Sequelize } from "sequelize";
import { Loan, LoanCreationAttributes } from "../models/loanModel";
import { BadRequestError, NotFoundError } from "../common/errors";

class LoanRepositry {
  async getLoanById(loan_id: number) {
    const loan = await Loan.findByPk(loan_id);
    return loan;
  }

  async getLoansByCustomerId(customer_id: number) {
    const loan = await Loan.findAll({
      where: {
        customer_id,
      },
    });
    return loan;
  }

  async createLoan(loan: LoanCreationAttributes) {
    const newLoan = await Loan.create(loan);
    return newLoan;
  }

  async getStatement(customer_id: number, loan_id: number) {
    const loan = await Loan.findOne({
      where: {
        customer_id,
        loan_id,
      },
      attributes: [
        "customer_id",
        "loan_id",
        ["loan_amount", "principal"],
        "interest_rate",
        ["monthly_repayment", "monthly_installment"],
        [
          Sequelize.literal(
            "(CAST(emis_paid_on_time AS FLOAT) + CAST(emis_paid_late AS FLOAT)) * monthly_repayment"
          ),
          "amount_paid",
        ],
        [
          Sequelize.literal("tenure - (emis_paid_on_time + emis_paid_late)"),
          "repayments_left",
        ],
      ],
    });

    return loan;
  }

  async getCreditScore(customer_id: number) {
    const loans = await Loan.findAll({
      where: {
        customer_id,
      },
    });

    //for the first time customer credit score is 30
    if (loans.length === 0) {
      return 30;
    }

    let creditScore = 100;

    creditScore -= loans.length * 2;

    const currentYearLoans = loans.filter(
      (loan) => loan.createdAt.getFullYear() === new Date().getFullYear()
    );
    creditScore -= currentYearLoans.length * 5;

    const approvedVolume = loans.reduce(
      (sum, loan) => sum + loan.loan_amount,
      0
    );
    creditScore -= approvedVolume / 1000;

    const currentLoansSum = loans.reduce(
      (sum, loan) => sum + loan.loan_amount,
      0
    );
    const approvedLimit = loans.reduce(
      (max, loan) => Math.max(max, loan.loan_amount),
      0
    );
    if (currentLoansSum > approvedLimit) {
      creditScore = 0;
    }

    creditScore = Math.max(0, Math.min(100, Math.round(creditScore)));

    return creditScore;
  }

  async makePayment(
    loan_id: number,
    customer_id: number,
    amount: number,
    paid_on_time: boolean
  ) {
    const loan = await Loan.findOne({
      where: {
        loan_id,
        customer_id,
      },
    });

    if (!loan) {
      throw new NotFoundError("Loan not found");
    }

    if (loan.emis_paid_on_time + loan.emis_paid_late === loan.tenure) {
      throw new BadRequestError("Loan already paid off");
    }

    let totalAmountRemaining =
      loan.amount_including_interest -
      (loan.emis_paid_on_time + loan.emis_paid_late) * loan.monthly_repayment;

    if (amount > totalAmountRemaining) {
      throw new BadRequestError("Amount is greater than the total amount");
    }

    totalAmountRemaining -= amount;

    if (paid_on_time) {
      loan.emis_paid_on_time += 1;
    } else {
      loan.emis_paid_late += 1;
    }

    const remainingMonths =
      loan.tenure - loan.emis_paid_on_time - loan.emis_paid_late;

    loan.monthly_repayment = totalAmountRemaining / remainingMonths;

    await loan.save();

    return loan;
  }
}

export const loanRepository = new LoanRepositry();

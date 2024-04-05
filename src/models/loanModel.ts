import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export interface LoanAttributes {
  loan_id: number;
  customer_id: number;
  loan_amount: number;
  tenure: number;
  interest_rate: number;
  amount_including_interest?: number;
  monthly_repayment?: number;
  emis_paid_on_time?: number;
  emis_paid_late?: number;
  start_date?: Date;
  end_date?: Date;
}

export interface LoanCreationAttributes
  extends Optional<LoanAttributes, "loan_id"> {}

@Table({
  tableName: "loans",
  modelName: "loan",
  timestamps: true,
})
export class Loan extends Model<LoanAttributes, LoanCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare loan_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare customer_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare loan_amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare tenure: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare interest_rate: number;

  @Column({
    type: DataType.FLOAT,
  })
  declare monthly_repayment: number;

  @Column({
    type: DataType.FLOAT,
  })
  declare amount_including_interest: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare emis_paid_on_time: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare emis_paid_late: number;

  @Column({
    type: DataType.DATE,
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_date: Date;

  @BeforeCreate
  static setDates(instance: Loan) {
    if (!instance.start_date) {
      const date = new Date();
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      instance.start_date = startDate;
    }
    if (!instance.end_date) {
      const startDate = instance.start_date;
      const monthIncrement = instance.tenure % 12;
      const yearIncrement = Math.floor(instance.tenure / 12);
      const endDate = new Date(
        startDate.getFullYear() + yearIncrement,
        startDate.getMonth() + monthIncrement,
        startDate.getDate()
      );
      endDate.setHours(23, 59, 59, 999);
      instance.end_date = endDate;
    }
  }

  @BeforeCreate
  static setMonthlyRepayment(instance: Loan) {
    if (!instance.monthly_repayment) {
      const r = instance.interest_rate / 12 / 100;
      const n = instance.tenure;
      const p = instance.loan_amount;
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      instance.monthly_repayment = emi;
    }
    instance.amount_including_interest =
      instance.monthly_repayment * instance.tenure;
  }
}

export default Loan;

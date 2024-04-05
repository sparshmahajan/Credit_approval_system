import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export interface CustomerAttributes {
  customer_id: number;
  first_name: string;
  last_name: string;
  age: number;
  phone_number: string;
  monthly_salary: number;
  approved_limit: number;
  current_debt: number;
}

export interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "customer_id"> {}

@Table({
  tableName: "customers",
  modelName: "customer",
  timestamps: true,
})
export class Customer extends Model<
  CustomerAttributes,
  CustomerCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    get() {
      return parseInt(this.getDataValue("customer_id"));
    },
  })
  declare customer_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    get() {
      return parseInt(this.getDataValue("age"));
    },
  })
  declare age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue("monthly_salary"));
    },
  })
  declare monthly_salary: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue("approved_limit"));
    },
    defaultValue: -1,
  })
  declare approved_limit: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      return parseFloat(this.getDataValue("current_debt"));
    },
    defaultValue: 0,
  })
  declare current_debt: number;

  @BeforeCreate
  static setDefaultValues(instance: Customer) {
    if (instance.approved_limit === -1) {
      instance.approved_limit =
        Math.round((instance.monthly_salary * 36) / 100000) * 100000;
    }
  }

  @BeforeCreate
  static capitalizeNames(instance: Customer) {
    instance.first_name =
      instance.first_name[0].toUpperCase() +
      instance.first_name.slice(1).toLowerCase();
    instance.last_name =
      instance.last_name[0].toUpperCase() +
      instance.last_name.slice(1).toLowerCase();
  }
}

export default Customer;

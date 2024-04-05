import { Customer, CustomerCreationAttributes } from "../models/customerModel";

class CustomerRepository {
  async findCustomerById(customer_id: number) {
    const customer = await Customer.findByPk(customer_id);
    return customer;
  }

  async findCustomerByPhoneNumber(phone_number: string) {
    const customer = await Customer.findOne({
      where: {
        phone_number,
      },
    });
    return customer;
  }

  async createCustomer(customer: CustomerCreationAttributes) {
    const customerExists = await this.findCustomerByPhoneNumber(
      customer.phone_number
    );

    if (customerExists) {
      throw new Error("Customer already exists");
    }

    const newCustomer = await Customer.create(customer);
    return newCustomer;
  }
}

const customerRepository = new CustomerRepository();

export default customerRepository;

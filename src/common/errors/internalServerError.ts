import { CustomError } from "./customError";

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(message: string = "Internal Server Error") {
    super(message);
    console.log(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return { message: "Internal Server Error" };
  }
}

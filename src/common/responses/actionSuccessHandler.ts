import { Response } from "express";

interface IActionSuccessHandler {
  [key: string]: any;
}

export class ActionSuccessHandler {
  private res: Response;
  private data: IActionSuccessHandler;
  private message: string;
  private statusCode: number;
  constructor(
    res: Response,
    message: string,
    data: IActionSuccessHandler,
    statusCode = 200
  ) {
    this.res = res;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      message: this.message,
      ...this.data,
    });
  }
}

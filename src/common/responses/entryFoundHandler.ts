import { Response } from "express";

export class EntryFoundHandler {
  private res: Response;
  private data: any;
  private message: string;
  private statusCode: number = 200;
  constructor(res: Response, message: string, data: any, statusCode?: number) {
    this.res = res;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode || this.statusCode;
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      message: this.message,
      ...this.data,
    });
  }
}

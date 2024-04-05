import { Response } from "express";

type PageProps = {
  limit: number;
  page: number;
  total: number;
};

export class EntriesFoundHandler {
  private res: Response;
  private data: any;
  private message: string;
  private entriesFound: number;
  private statusCode = 200;
  private pageProps: PageProps | undefined;

  constructor(
    res: Response,
    message: string,
    data: any,
    length: number = 0,
    pageProps?: PageProps
  ) {
    this.res = res;
    this.entriesFound = data.length || length;
    this.message = message;
    this.data = data;
    this.pageProps = pageProps;
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      entriesFound: this.entriesFound,
      message: this.message,
      data: this.data,
      pageIndex: this.pageProps?.page,
      pageSize: this.pageProps?.limit,
      totalSize: this.pageProps?.total,
    });
  }
}

import { Request, Response } from "express";
import { ActionSuccessHandler } from "../common/responses";
import { addToDb } from "../utils/addToDb";

export const addDataToTables = async (req: Request, res: Response) => {
  await addToDb();
  return new ActionSuccessHandler(res, "Data successfully added to tables", {});
};

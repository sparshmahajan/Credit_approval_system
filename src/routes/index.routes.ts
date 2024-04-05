import { Application } from "express";
import { NotFoundError } from "../common/errors";
import { customerRoutes } from "./customer.routes";

export default (app: Application) => {
  app.get("/", (_req, res) => {
    res.json({
      message: "Welcome to the API",
    });
  });

  app.use("/api", customerRoutes);

  app.use("*", (_req, _res) => {
    throw new NotFoundError("Route not found");
  });
};

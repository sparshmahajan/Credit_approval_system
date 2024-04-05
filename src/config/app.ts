import express from "express";
import "express-async-errors";
import cors from "cors";
import logger from "morgan";
import indexRoutes from "../routes/index.routes";
import { errorHandler } from "../middlewares";

const app = express();
app.set("trust proxy", true);
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

indexRoutes(app);
app.use(errorHandler);

export { app };

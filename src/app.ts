import { routes } from "./routes";
import { handleError } from "./middlewares/error.middleware";
import "reflect-metadata";
import express, { Request, Response } from "express";
import { connectDatabase } from "./database";
import dotenv from "dotenv";

connectDatabase();

dotenv.config();

const app = express();

app.use(express.json());

routes(app);

app.use(handleError);

export default app;

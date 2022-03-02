import { routes } from "./routes";
import { handleError } from "./middlewares/error.middleware";
import "reflect-metadata";
import express from "express";
import { connectDatabase } from "./database";
import dotenv from "dotenv";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

connectDatabase();

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

routes(app);

app.use(handleError);

export default app;

import { buySchema } from "./../schemas/order.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import { buy /*list, retrieve*/ } from "../controllers/order.controller";
import express from "express";

const router = express.Router();

export const buyRouter = () => {
  router.post("", authenticateUser, buy);
  //   router.get("/:id", authenticateUser, retrieve);
  //   router.get("", authenticateUser, list);

  return router;
};

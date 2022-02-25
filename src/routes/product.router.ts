import { createProductSchema } from "./../schemas/product.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import { create, list, listOne } from "../controllers/product.controller";
import express from "express";

const router = express.Router();

export const productRouter = () => {
  router.post("", validate(createProductSchema), authenticateUser, create);
  router.get("", list);
  router.get("/:id", listOne);
  return router;
};

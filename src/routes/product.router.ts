import { createProductSchema } from "./../schemas/product.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authorizateAdm } from "./../middlewares/authorization.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import { create, list, retrieve } from "../controllers/product.controller";
import express from "express";

const router = express.Router();

export const productRouter = () => {
  router.post(
    "",
    validate(createProductSchema),
    authenticateUser,
    authorizateAdm,
    create
  );
  router.get("/:id", retrieve);
  router.get("", list);
  return router;
};

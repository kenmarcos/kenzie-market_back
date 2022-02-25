import {
  addProductToCartSchema,
  removeProductFromCartSchema,
} from "./../schemas/cart.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authorizateAdm } from "./../middlewares/authorization.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import express from "express";
import { add, list, retrieve, remove } from "../controllers/cart.controller";

const router = express.Router();

export const cartRouter = () => {
  router.post("", validate(addProductToCartSchema), authenticateUser, add);
  router.get("/:id", authenticateUser, authorizateAdm, retrieve);
  router.get("", authenticateUser, authorizateAdm, list);
  router.delete(
    "/:product_id",
    validate(removeProductFromCartSchema),
    authenticateUser,
    authorizateAdm,
    remove
  );
  return router;
};

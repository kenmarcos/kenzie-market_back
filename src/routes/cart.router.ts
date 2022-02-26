import {
  addProductToCartSchema,
  removeProductFromCartSchema,
} from "./../schemas/cart.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import express from "express";
import { add, list, listOne, remove } from "../controllers/cart.controller";

const router = express.Router();

export const cartRouter = () => {
  router.post("", validate(addProductToCartSchema), authenticateUser, add);
  router.get("", authenticateUser, list);
  router.get("/:id", authenticateUser, listOne);
  router.delete(
    "/:product_id",
    validate(removeProductFromCartSchema),
    authenticateUser,
    remove
  );

  return router;
};

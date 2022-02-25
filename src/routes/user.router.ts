import express from "express";
import { validate } from "./../middlewares/validation.middleware";
import { createUserSchema } from "./../schemas/user.schema";
import { create, list, listOne } from "./../controllers/user.controller";
import { authenticateUser } from "./../middlewares/authenticate.middleware";

const router = express.Router();

export const userRouter = () => {
  router.post("", validate(createUserSchema), create);
  router.get("", authenticateUser, list);
  router.get("/:id", authenticateUser, listOne);
  return router;
};

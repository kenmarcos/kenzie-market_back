import { authorizateAdm } from "./../middlewares/authorization.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import express from "express";
import { validate } from "./../middlewares/validation.middleware";
import { createUserSchema } from "./../schemas/user.schema";
import { create, list, retrieve } from "./../controllers/user.controller";

const router = express.Router();

export const userRouter = () => {
  router.post("", validate(createUserSchema), create);
  router.get("/:id", authenticateUser, authorizateAdm, retrieve);
  router.get("", authenticateUser, authorizateAdm, list);
  return router;
};

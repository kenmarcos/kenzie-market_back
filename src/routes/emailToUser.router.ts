import { emailToUserSchema } from "./../schemas/email.schema";
import { validate } from "./../middlewares/validation.middleware";
import { authenticateUser } from "./../middlewares/authenticate.middleware";
import express from "express";
import { send } from "../controllers/emailToUser.controller";

const router = express.Router();

export const emailToUserRouter = () => {
  router.post("", validate(emailToUserSchema), authenticateUser, send);

  return router;
};

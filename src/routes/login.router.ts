import { loginSchema } from "./../schemas/login.schema";
import { validate } from "./../middlewares/validation.middleware";
import express from "express";
import { login } from "../controllers/login.controller";

const router = express.Router();

export const loginRouter = () => {
  router.post("", validate(loginSchema), login);

  return router;
};

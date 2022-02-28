import express from "express";
import {
  sendPassRecTokenSchema,
  changePassSchema,
} from "./../schemas/recPass.schema";
import { validate } from "./../middlewares/validation.middleware";
import { send, change } from "./../controllers/recPass.controller";

const router = express.Router();

export const recPassRouter = () => {
  router.post("/recuperar", validate(sendPassRecTokenSchema), send);
  router.post("/alterar_senha", validate(changePassSchema), change);

  return router;
};

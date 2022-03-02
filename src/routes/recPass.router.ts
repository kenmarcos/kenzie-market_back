import express from "express";
import {
  sendPassRecTokenSchema,
  changePassSchema,
} from "./../schemas/recPass.schema";
import { validate } from "./../middlewares/validation.middleware";
import { send, change } from "./../controllers/recPass.controller";

const router = express.Router();

export const recPassRouter = () => {
  router.post("/recover", validate(sendPassRecTokenSchema), send);
  router.post("/change_password", validate(changePassSchema), change);

  return router;
};

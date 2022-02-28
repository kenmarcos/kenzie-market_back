import { Express } from "express";
import { loginRouter } from "./login.router";
import { userRouter } from "./user.router";
import { productRouter } from "./product.router";
import { cartRouter } from "./cart.router";
import { buyRouter } from "./buy.router";
import { emailToUserRouter } from "./emailToUser.router";
import { recPassRouter } from "./recPass.router";

export const routes = (app: Express) => {
  app.use("/user", userRouter());
  app.use("/login", loginRouter());
  app.use("/product", productRouter());
  app.use("/cart", cartRouter());
  app.use("/buy", buyRouter());
  app.use("/email", emailToUserRouter());
  app.use("", recPassRouter());
};

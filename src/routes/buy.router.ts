// import { buySchema } from "./../schemas/order.schema";
// import { validate } from "./../middlewares/validation.middleware";
// import { authorizateAdm } from "./../middlewares/authorization.middleware";
// import { authenticateUser } from "./../middlewares/authenticate.middleware";
// import { buy, list, retrieve } from "../controllers/order.controller";
// import express from "express";

// const router = express.Router();

// export const buyRouter = () => {
//   router.post("", validate(buySchema), authenticateUser, authorizateAdm, buy);
//   router.get("/:id", authenticateUser, authorizateAdm, retrieve);
//   router.get("", authenticateUser, list);
//   return router;
// };

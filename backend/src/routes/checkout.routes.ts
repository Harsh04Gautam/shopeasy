import express from "express";
import { getCheckoutSession } from "../controllers/checkout.controller";
import validateResource from "../middlewares/validateResource";
import { GetCheckoutSessionSchema } from "../schemas/checkout.schema";

const checkoutRouter = express.Router();

checkoutRouter.post(
  "/",
  validateResource(GetCheckoutSessionSchema),
  getCheckoutSession
);

export default checkoutRouter;

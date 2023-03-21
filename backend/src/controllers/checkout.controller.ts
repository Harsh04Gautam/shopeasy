import config from "config";
import Stripe from "stripe";
import { Request } from "express";
import { GetCheckoutSessionInput } from "../schemas/checkout.schema";
import catchAsync from "../utils/catchAsync";
import Product from "../models/product.model";

const stripe = new Stripe(config.get("stripeSecret"), {
  apiVersion: "2022-11-15",
});

export const getCheckoutSession = catchAsync(
  async (req: Request<{}, {}, GetCheckoutSessionInput["body"]>, res, _next) => {
    const { items } = req.body;

    const products = await Promise.all(
      items.map((item) => Product.findById(item.id))
    );

    const productsInfo = products.map((product, i) => ({
      product,
      quantity: items[i].quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: productsInfo.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.product?.name || "" },
          unit_amount: (item.product?.price || 1) * 100,
        },
        quantity: item.quantity,
      })),
      success_url: config.get("clientURL"),
    });

    res.status(200).json({
      url: session.url,
    });
  }
);

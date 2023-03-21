import z from "zod";

export const GetCheckoutSessionSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        id: z.string({ required_error: "product id is required" }),
        quantity: z.number({ required_error: "product quantity is required" }),
      })
    ),
  }),
});

export type GetCheckoutSessionInput = z.infer<typeof GetCheckoutSessionSchema>;

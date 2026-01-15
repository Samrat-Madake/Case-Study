import { z } from "zod";

export const TransferSchema = z.object({
  fromCustomerId: z.string().uuid(),
  toCustomerId: z.string().uuid(),
  points: z.number().int().positive(),
});

export type TransferRequest = z.infer<typeof TransferSchema>;

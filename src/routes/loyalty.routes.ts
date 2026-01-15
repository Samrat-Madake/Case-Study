import { Router } from "express";
import { validate } from "../middlewares/validate";
import { TransferSchema } from "../schemas/transfer.schema";
import { transferPoints } from "../controller/loyalty.controller";

const router = Router();

router.post(
  "/transfer",
  validate(TransferSchema),
  transferPoints
);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;

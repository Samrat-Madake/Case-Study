import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validate";
import { TransferSchema, TransferRequest } from "../schemas/transfer.schema";
import { loyaltyMembers } from "../db/fake.db";
import { ApiError, InsufficientPointsError } from "../errors/api.error";

const router = Router();

router.post(
  "/transfer",
  validate(TransferSchema),
  (req: Request<{}, {}, TransferRequest>, res: Response) => {
    const { fromCustomerId, toCustomerId, points } = req.body;

    // Check sender exists
    const senderPoints = loyaltyMembers.get(fromCustomerId);
    if (senderPoints === undefined) {
      throw new ApiError(404, "Sender not found");
    }

    // Check receiver exists
    const receiverPoints = loyaltyMembers.get(toCustomerId);
    if (receiverPoints === undefined) {
      throw new ApiError(404, "Receiver not found");
    }

    // Check sufficient points
    if (senderPoints < points) {
      throw new InsufficientPointsError();
    }

    // Transfer points
    loyaltyMembers.set(fromCustomerId, senderPoints - points);
    loyaltyMembers.set(toCustomerId, receiverPoints + points);

    res.json({
      status: "success",
      data: {
        fromCustomerId,
        toCustomerId,
        transferredPoints: points,
        senderRemainingPoints: senderPoints - points,
      },
    });
  }
);

export default router;

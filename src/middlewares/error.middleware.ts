import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      error: err.message,
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    error: "Internal server error",
  });
};

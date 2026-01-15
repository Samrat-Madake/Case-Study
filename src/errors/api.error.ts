export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export class InsufficientPointsError extends ApiError {
  constructor() {
    super(400, "Insufficient points");
  }
}

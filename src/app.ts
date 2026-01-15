import express from "express";
import loyaltyRoutes from "./routes/loyalty.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

// Routes
app.use("/api/loyalty", loyaltyRoutes);

// Global error handler (must be last)
app.use(errorMiddleware);

export default app;

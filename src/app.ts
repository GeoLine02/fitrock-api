import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import ProductRoutes from "./routes/products.routes";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get("/", (_, res) => {
  res.send("API running");
});

app.use("/products", ProductRoutes);

// Listen on port 4000
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

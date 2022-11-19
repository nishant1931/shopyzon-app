import express from "express";
import path from "path";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import Razorpay from "razorpay";

dotenv.config();

connectDb();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/orders/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(5000, () => {
  console.log(`SERVER STARTED in ${process.env.NODE_ENV} mode on PORT ${PORT}`);
});

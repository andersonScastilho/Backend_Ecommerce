import express from "express";
import cron from 'node-cron'
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

import "./database";

import verifyPayments from './services/VerifyPayments'

import admTokenRoutes from "./routes/admTokenRoutes";
import admUserRoutes from "./routes/admUserRoutes";
import adressRoutes from "./routes/adressRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import imageS3Bucket from "./routes/imageS3bucket";
import productCategoryRoutes from "./routes/productCategoryRoutes";
import productRoutes from "./routes/productRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import userRoutes from "./routes/userRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import requestRoutes from './routes/requestRouter'

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.jobs()
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

  }
  routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoutes);
    this.app.use("/adress", adressRoutes);
    this.app.use("/images", imageS3Bucket);
    this.app.use("/products", productRoutes);
    this.app.use("/categories", categoryRoutes);
    this.app.use("/productcategory", productCategoryRoutes);
    this.app.use("/admtokens", admTokenRoutes);
    this.app.use("/admUsers", admUserRoutes);
    this.app.use("/payment", paymentRoutes);
    this.app.use('/requests', requestRoutes)

  }

  jobs() {
    cron.schedule('*/5 * * * *', () => {

      verifyPayments()
    })
  }
}
export default new App().app;
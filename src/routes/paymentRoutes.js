import { Router } from "express";
import loginRequired from '../middlewares/loginRequired'
import paymentController from "../controllers/PaymentController";

const router = new Router();

router.post("/:nro_request", loginRequired, paymentController.store);

export default router;

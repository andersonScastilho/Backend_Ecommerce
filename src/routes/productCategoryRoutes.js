import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";

import productCategoryController from "../controllers/ProductCategoryController";

const router = new Router();

router.delete(
  "/:product_id/:category_id",
  loginAdmUserRequired,
  validUserRole,
  productCategoryController.delete
);

export default router;

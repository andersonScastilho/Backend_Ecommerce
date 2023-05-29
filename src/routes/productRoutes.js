import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";

import productController from "../controllers/ProductController";

const router = new Router();

router.post("/", loginAdmUserRequired, validUserRole, productController.store);
router.put("/:product_id", loginAdmUserRequired, validUserRole, productController.update);
router.delete("/:product_id", loginAdmUserRequired, validUserRole, productController.delete);
router.get("/:product_id", productController.show);
router.get("/", productController.index);

export default router;

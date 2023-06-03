import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import productController from "../controllers/ProductController";

import createProductSchema from '../schemas/products/productSchema'

const router = new Router();

router.post("/", loginAdmUserRequired, validUserRole, joiSchemaValidator(createProductSchema), productController.store);
router.get("/", productController.index);

router.put("/:product_id", loginAdmUserRequired, validUserRole, productController.update);
router.delete("/:product_id", loginAdmUserRequired, validUserRole, productController.delete);
router.get("/:product_id", productController.show);


export default router;

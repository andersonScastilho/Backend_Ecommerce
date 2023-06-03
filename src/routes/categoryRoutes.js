import { Router } from "express";

import loginAdmRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import categoryController from "../controllers/CategoryController";

import categorSchema from '../schemas/category/categorySchema'

const router = new Router();

router.post("/", loginAdmRequired, validUserRole, joiSchemaValidator(categorSchema), categoryController.store);

router.delete("/:category_id", loginAdmRequired, validUserRole, categoryController.delete);

export default router;

import { Router } from "express";

import loginAdmRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";

import categoryController from "../controllers/CategoryController";

const router = new Router();

router.post("/", loginAdmRequired, validUserRole, categoryController.store);
router.delete("/:category_id", loginAdmRequired, validUserRole, categoryController.delete);

export default router;

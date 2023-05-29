import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from '../middlewares/validUserRole'

import roleController from "../controllers/RoleController";

const router = new Router();

router.post("/", loginAdmUserRequired, validUserRole, roleController.store);

export default router;

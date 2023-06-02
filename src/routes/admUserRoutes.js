import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import admUserController from "../controllers/AdmUserController";

import admUserSchema from '../schemas/admUsers/createAdmUser'

const router = new Router();

router.post("/", loginAdmUserRequired, joiSchemaValidator(admUserSchema), admUserController.store);
router.get("/", loginAdmUserRequired, admUserController.show);

export default router;

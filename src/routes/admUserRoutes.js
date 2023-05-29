import { Router } from "express";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";

import admUserController from "../controllers/AdmUserController";

const router = new Router();

router.post("/", admUserController.store);
router.get("/", loginAdmUserRequired, admUserController.show);

export default router;

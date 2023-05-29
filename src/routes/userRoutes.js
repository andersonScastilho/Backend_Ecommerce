import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";

import UserController from "../controllers/UserController";

const router = Router();

router.post("/", UserController.store);
router.put("/", loginRequired, UserController.update);
router.get("/", loginRequired, UserController.show);
router.delete("/", loginRequired, UserController.delete);

export default router;

import { Router } from "express";

import admTokenController from "../controllers/AdmTokenController";

const router = new Router();

router.post("/", admTokenController.store);

export default router;

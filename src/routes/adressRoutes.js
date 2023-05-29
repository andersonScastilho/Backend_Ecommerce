import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";

import adressController from "../controllers/AdressController";

const router = new Router();

router.post("/", loginRequired, adressController.store);
router.get("/:adress_id", loginRequired, adressController.show);
router.put("/:adress_id", loginRequired, adressController.update);
router.delete("/:adress_id", loginRequired, adressController.delete);

export default router;

import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";

import addressController from "../controllers/AddressController";

const router = new Router();

router.post("/", loginRequired, addressController.store);
router.get("/:address_id", loginRequired, addressController.show);
router.put("/:address_id", loginRequired, addressController.update);
router.delete("/:address_id", loginRequired, addressController.delete);

export default router;

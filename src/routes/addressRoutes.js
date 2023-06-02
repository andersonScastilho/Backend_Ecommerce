import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import addressController from "../controllers/AddressController";

import createAddress from '../schemas/address/createAddress'

const router = new Router();

router.get("/", loginRequired, addressController.index);
router.post("/", loginRequired, joiSchemaValidator(createAddress), addressController.store);
router.get("/:address_id", loginRequired, addressController.show);
router.put("/:address_id", loginRequired, addressController.update);
router.delete("/:address_id", loginRequired, addressController.delete);

export default router;

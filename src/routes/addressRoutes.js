import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";
import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import addressController from "../controllers/AddressController";

import createAddressSchema from '../schemas/address/createAddressSchema'
import updateAddressSchema from '../schemas/address/updateAddressSchema'

const router = new Router();

router.get("/", loginRequired, addressController.index);
router.post("/", loginRequired, joiSchemaValidator(createAddressSchema), addressController.store);
router.get("/:address_id", loginRequired, addressController.show);
router.put("/:address_id", loginRequired, joiSchemaValidator(updateAddressSchema), addressController.update);
router.delete("/:address_id", loginRequired, addressController.delete);

export default router;

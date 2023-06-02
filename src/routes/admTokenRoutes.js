import { Router } from "express";

import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import admTokenController from "../controllers/AdmTokenController";

import admTokenSchema from '../schemas/tokens/admTokenSchema'

const router = new Router();

router.post("/", joiSchemaValidator(admTokenSchema), admTokenController.store);


export default router;

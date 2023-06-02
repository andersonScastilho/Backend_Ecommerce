import { Router } from "express";

import joiSchemaValidator from '../middlewares/joiSchemaValidator'

import tokenController from "../controllers/TokenController";

import tokenSchema from '../schemas/tokens/tokenSchema'


const router = new Router();

router.post("/", joiSchemaValidator(tokenSchema), tokenController.store);

export default router;

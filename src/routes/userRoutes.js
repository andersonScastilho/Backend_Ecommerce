import { Router } from "express";

import loginRequired from "../middlewares/loginRequired";
import joiSchemaValidator from "../middlewares/joiSchemaValidator";

import UserController from "../controllers/UserController";

import createUser from "../schemas/users/createUser";
import updateUser from '../schemas/users/updateUser'

const router = Router();

router.post("/", joiSchemaValidator(createUser), UserController.store);
router.put("/", joiSchemaValidator(updateUser), loginRequired, UserController.update);

router.get("/", loginRequired, UserController.show);
router.delete("/", loginRequired, UserController.delete);

export default router;

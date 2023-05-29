import { Router } from "express";
import multer from "multer";

import loginAdmUserRequired from "../middlewares/loginAdmUserRequired";
import validUserRole from "../middlewares/validUserRole";

import imageController from "../controllers/ImageController";

const updload = multer({ dest: "uploads" });

const router = new Router();

router.post(
  "/:product_id",
  loginAdmUserRequired,
  validUserRole,
  updload.single("image"),
  imageController.uploadFile
);
router.get("/:key", imageController.getImagesByKey);
export default router;

import express from "express";
import protectAdmin from "../middleware/AdminProtect.js";
import upload from "../middleware/upload.js";
import { adminLogin } from "../controllers/adminAuth.controller.js";

import { refreshAdminToken } from "../controllers/adminRefreshToken.js";

import {
  createOrUpdateMaterial,
  getAdminMaterials,
  deleteMaterial,
  updateMaterial,
} from "../controllers/adminStudyMaterialController.js";

const router = express.Router();

/* ===== ADMIN LOGIN ===== */

router.post("/login", adminLogin);



/* ===== UPLOAD ===== */
router.post(
  "/study-material",
  protectAdmin,
  upload.single("file"),
  createOrUpdateMaterial
);

/* ===== GET MATERIALS ===== */
router.get(
  "/study-materials",
  protectAdmin,
  getAdminMaterials
);

/* ===== DELETE ===== */
router.delete(
  "/study-materials/:id",
  protectAdmin,
  deleteMaterial
);

/* ===== UPDATE ===== */
router.put(
  "/study-materials/:id",
  protectAdmin,
  updateMaterial
);






router.post('/refresh-token',refreshAdminToken)

export default router;

import express from "express";
import {
  createDish,
  deleteDish,
  getAllDish,
  getAllDishByRestaurantId,
  getDishById,
  updateDish,
} from "../controllers/dishController.js";

import { upload } from "../config/multer.js";
import { adminMiddleware } from '../middleware/auth.middleware.js';
const dishRouter = express.Router();

dishRouter.post("/create", adminMiddleware, upload.single("image"), createDish);
dishRouter.get("/all", getAllDish);
dishRouter.get("/:id", getDishById);
dishRouter.delete("/:id", adminMiddleware, deleteDish);
dishRouter.get("/restaurant/:id", getAllDishByRestaurantId);
dishRouter.put("/update/image/:id", adminMiddleware, upload.single("image"), updateDish);
dishRouter.put("/update/dish/:id", adminMiddleware, updateDish);

export default dishRouter;

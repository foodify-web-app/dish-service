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
import { adminMiddleware } from 'common-utils'
const dishRouter = express.Router();

// image storage Engine

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

dishRouter.post("/create", adminMiddleware, upload.single("image"), createDish);
dishRouter.get("/all", getAllDish);
dishRouter.get("/:id", getDishById);
dishRouter.delete("/:id", adminMiddleware, deleteDish);
dishRouter.get("/restaurant/:id", getAllDishByRestaurantId);
dishRouter.put("/update/:id", updateDish);

export default dishRouter;

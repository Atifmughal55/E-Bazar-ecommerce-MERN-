import express from "express";
import { isAdmin, requiredSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//Create category routes
router.post(
  "/create-category",
  requiredSignIn,
  isAdmin,
  createCategoryController
);

//Update category routes

router.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryController
);

//get ALl Category routes
router.get("/get-category", categoryController);

//get single category routes
router.get("/single-category/:slug", singleCategoryController);
export default router;

//Delete category routes
router.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

import express from "express";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  filterProductController,
  getOrdersController,
  getProductsController,
  getSingleProductController,
  productCountController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//Create product route
router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Get products route
router.get("/get-products", getProductsController);

//Get single product
router.get("/get-product/:slug", getSingleProductController);

//Get photo
router.get("/product-photo/:pid", productPhotoController);

//Delete product
router.delete("/delete-product/:pid", deleteProductController);

//Filter products
router.post("/product-filters", filterProductController);

//product count
router.get("/product-count", productCountController);

//product pre page
router.get("/product-list/:page", productListController);

//Search product
router.get("/search", searchProductController);

//Similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//payment routes
//tokens from braintree to verify account
router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requiredSignIn, braintreePaymentController);

//orders
router.get("/orders", requiredSignIn, getOrdersController);

export default router;

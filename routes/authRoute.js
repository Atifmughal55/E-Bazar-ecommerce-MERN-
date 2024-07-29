import express from "express";
import {
  registerController,
  loginController,
  testControllor,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot password
router.post("/forgot-password", forgotPasswordController);
//TEST route
router.get("/test", requiredSignIn, isAdmin, testControllor);

//protected route user auth
router.get("/auth-user", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route admin auth
router.get("/auth-admin", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requiredSignIn, updateProfileController);
export default router;

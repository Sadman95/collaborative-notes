import express, { Router } from "express";
import { limiter } from "../../middlewares/rateLimit";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import checkAuth from "../../middlewares/checkAuth";

const router: Router = express.Router();

router.use(limiter(10, 5));

router
	.post(
		"/signup",
    validateRequest(AuthValidation.signupZodValidation),
		AuthController.signUpController
	)
	.post(
		"/login",
		validateRequest(AuthValidation.loginZodValidation),
		AuthController.loginController
	)
	.post(
		"/refreshToken",
		validateRequest(AuthValidation.refreshTokenZodValidation),
		AuthController.refreshTokenController
	)
	.get("/logout", checkAuth, AuthController.logoutController);

export const AuthRoutes = router;

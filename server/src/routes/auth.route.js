import {Router} from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { loginController, logoutController, meController, refreshController, registerController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const routes = Router()

//@post controllers
routes.post("/register",registerValidator,registerController)
routes.post("/login",loginValidator,loginController)
routes.post("/refresh",refreshController)
routes.post("/logout",authenticate,logoutController)

//@get controllers
routes.get("/me",authenticate,meController)

export default routes
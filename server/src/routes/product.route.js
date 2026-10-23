import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { productValidator } from "../validators/product.validator.js";
import { createProductController, deletedProductController, getAllProductsController, getProductByIdController, updateProductController } from "../controllers/product.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    file: 5,
    fieldSize:1*1024*1024
  },
});

const routes = Router();

routes.post("/",authenticate,upload.array("images"),productValidator,createProductController)

routes.get("/",authenticate,getAllProductsController)
routes.get("/:id",authenticate,getProductByIdController)

routes.put("/:id",authenticate,updateProductController)

routes.delete("/:id",authenticate,deletedProductController)

export default routes;

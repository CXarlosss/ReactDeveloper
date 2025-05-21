import { Router, Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
} from "./handlers/product";

import {
  validateCreateProduct,
  validateUpdateProduct,
  validatePartialUpdateProduct,
  validateProductId
} from "./middlewares/productValidation";

const router = Router();

const healthCheck = (_req: Request, res: Response): void => {
  res.json({ message: "API funcionando ✅" });
};

router.get("/", healthCheck);

router.get("/products", getProducts);
router.get("/products/:id", ...validateProductId, getProductById);
router.post("/products", ...validateCreateProduct, createProduct);
router.put("/products/:id", ...validateUpdateProduct, updateProduct);
router.patch("/products/:id", ...validatePartialUpdateProduct, partialUpdateProduct);
router.delete("/products/:id", ...validateProductId, deleteProduct);

export default router;

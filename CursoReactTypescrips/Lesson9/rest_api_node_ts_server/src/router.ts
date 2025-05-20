// router.ts
import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
} from "./handlers/product.js"; // Asegúrate de que tenga .js

import {
  validateCreateProduct,
  validateUpdateProduct,
  validatePartialUpdateProduct,
  validateProductId
} from "./middlewares/productValidation.js"; // <--- ¡ESTA ES LA RUTA CORRECTA SI TU ARCHIVO ESTÁ EN 'src/middlewares/productValidation.ts'!

const router = Router();

router.get("/", (_req, res) => res.json({ message: "API funcionando ✅" }));

// CRUD completo
router.get("/products", getProducts);
router.get("/products/:id", validateProductId, getProductById);
router.post("/products", validateCreateProduct, createProduct);
router.put('/products/:id', validateUpdateProduct, updateProduct);
router.patch("/products/:id", validatePartialUpdateProduct, partialUpdateProduct);
router.delete("/products/:id", validateProductId, deleteProduct);

export default router;
// router.ts
import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
} from "./handlers/product.js"; // Asegúrate de que el camino sea correcto

import {
  validateCreateProduct,
  validateUpdateProduct,
  validatePartialUpdateProduct,
  validateProductId
} from "../middlewares/productValidation.js"; // <--- CAMBIO CLAVE AQUÍ: usar el nombre correcto de tu archivo
const router = Router();

router.get("/", (_req, res) => res.json({ message: "API funcionando ✅" }));

// CRUD completo
router.get("/products", getProducts);
router.get("/products/:id", validateProductId, getProductById); // Validación para el ID
router.post("/products", validateCreateProduct, createProduct); // Validación para la creación
router.put('/products/:id', validateUpdateProduct, updateProduct); // Validación para la actualización completa
router.patch("/products/:id", validatePartialUpdateProduct, partialUpdateProduct); // Validación para la actualización parcial
router.delete("/products/:id", validateProductId, deleteProduct); // Validación para el ID

export default router;
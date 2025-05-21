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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Comprobar si la API funciona
 *     tags: [HealthCheck]
 *     responses:
 *       200:
 *         description: La API está funcionando correctamente
 */
const healthCheck = (_req: Request, res: Response): void => {
  res.json({ message: "API funcionando ✅" });
};

router.get("/", healthCheck);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/products/:id", ...validateProductId, getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - availability
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               availability:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/products", ...validateCreateProduct, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar completamente un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - availability
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               availability:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 */
router.put("/products/:id", ...validateUpdateProduct, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               availability:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado parcialmente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 */
router.patch("/products/:id", ...validatePartialUpdateProduct, partialUpdateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/products/:id", ...validateProductId, deleteProduct);

export default router;

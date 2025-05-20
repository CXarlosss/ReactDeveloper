import { Router } from "express";
import { createProduct } from "./handlers/product.js";
const router = Router();

router.get("/", (req, res) => {
  res.json("Desde GET");
});
router.post("/products", createProduct); // ✅ ahora apunta a /products
router.put("/", (req, res) => {
  res.json("Desde PUT");
});
router.patch("/", (req, res) => {
  res.json("Desde PATCH");
});
router.delete("/", (req, res) => {
  res.json("Desde DELETE");
});

export default router;
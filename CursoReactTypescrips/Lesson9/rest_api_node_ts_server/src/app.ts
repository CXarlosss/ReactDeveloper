// src/app.ts
import express from "express";
import cors from "cors";
import productsRouter from "./router";

const app = express();

app.use(cors()); // ✅ esto permite testear el header de CORS
app.use(express.json());
app.use("/", productsRouter);

export default app;

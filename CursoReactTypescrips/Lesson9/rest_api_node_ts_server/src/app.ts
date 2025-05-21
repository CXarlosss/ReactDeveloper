import express from "express";
import cors from "cors";
import productsRouter from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

// 👇 Swagger debe ir antes del router
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/", productsRouter);

export default app;

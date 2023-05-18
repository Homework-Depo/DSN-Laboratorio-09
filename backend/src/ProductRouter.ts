import { Router } from "express";
import * as ProductController from './ProductController';

const router = Router();

router.get("/product", ProductController.findManyProducts);
router.post("/product", ProductController.createProduct);
router.get("/product/:id", ProductController.findFirstProduct);
router.post("/product/:id", ProductController.updateProduct);

export default router;
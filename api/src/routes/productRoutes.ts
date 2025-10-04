// File: src/routes/productRoutes.ts
import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import * as productController from "../controllers/productController";
import * as productService from "../services/productService";

const router = Router();

// ⚡ Categories route (put before :id so it doesn't conflict)
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await productService.getAllCategories();
    res.json({
      data: categories.map((c: { category: string | null }) => c.category),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Product CRUD routes
router.post("/", authenticateToken, productController.createProduct);
router.get("/", authenticateToken, productController.getProducts);
router.get("/:id", authenticateToken, productController.getProduct);
router.put("/:id", authenticateToken, productController.updateProduct);
router.delete("/:id", authenticateToken, productController.deleteProduct);

export default router;

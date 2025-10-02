// File: apps/api/src/routes/ProductRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/', authenticateToken, productController.createProduct);
router.get('/', authenticateToken, productController.getProducts);
router.get('/:id', authenticateToken, productController.getProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

export default router;

import express from 'express';
import ProductController from '../controllers/product.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authenticate, isAdmin, ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', authenticate, isAdmin, ProductController.updateProduct);
router.delete('/:id', authenticate, isAdmin, ProductController.deleteProduct);

export default router;

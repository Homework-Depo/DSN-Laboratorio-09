import { Router } from 'express';
import * as ProductController from './ProductController';
import { upload } from './config/multer';

const router = Router();

router.get('/product', ProductController.findManyProducts);
router.post('/product', upload.single('imgFile'), ProductController.createProduct);
router.get('/product/:id', ProductController.findFirstProduct);
router.post('/product/:id', ProductController.updateProduct);
router.post('/product/:id/delete', ProductController.deleteProduct);

export default router;
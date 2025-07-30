import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();

productRoutes.get('/', ProductController.listAll);
productRoutes.get('/:id', ProductController.getById);
productRoutes.post('/', ProductController.create);
productRoutes.put('/:id', ProductController.update);
productRoutes.delete('/:id', ProductController.delete);

export default productRoutes;
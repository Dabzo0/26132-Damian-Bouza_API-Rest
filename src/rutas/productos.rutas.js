import express from 'express';
import { getProductos, getProductoPorId, postProducto, patchProducto, deleteProducto, putRestaurarProducto } from '../controladores/productos.controladores.js';
import {authentication} from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', getProductos); 
router.get('/:id', getProductoPorId);
router.post('/create', authentication, postProducto);
router.patch('/:id', authentication, patchProducto);
router.delete('/:id', authentication, deleteProducto);
router.put('/:id/restaurar', authentication, putRestaurarProducto);

export default router;
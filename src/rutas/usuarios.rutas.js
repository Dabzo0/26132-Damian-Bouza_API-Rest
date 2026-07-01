import express from 'express';
import { postLoginUsuario } from '../controladores/usuarios.controladores.js';

const router = express.Router();

router.get('/login', postLoginUsuario);

export default router
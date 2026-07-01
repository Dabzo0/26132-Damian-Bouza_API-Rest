import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret_key = process.env.JWT_SECRET_KEY;

export const authentication = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });

    if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Acceso denegado. "Bearer <TOKEN>" es requerido en el encabezado Authorization.' });
    
    const token = authHeader.split(' ')[1];

   
    jwt.verify(token, secret_key, (err, usuarioDecodificado) => {
        if (err) return res.status(403).json({ error: 'Acceso denegado. Token inválido o expirado.' });
    
        // req.usuario = usuarioDecodificado; <-- Aquí puedes adjuntar la información del usuario decodificado al objeto req si lo deseas 
        
        next();
    });
};
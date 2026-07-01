import express from 'express';
import productosRutas from './src/rutas/productos.rutas.js';
import usuariosRutas from './src/rutas/usuarios.rutas.js';
// import bodyParser from 'body-parser'; <- Esta en los requerimientos de la entrega del proyecto, pero no es necesario en la versión de express 4.16.0 y posteriores, ya que express incluye un middleware para parsear JSON.
import cors from 'cors';

const PORT = 3000;

const app =express();

const corsOptions = {
    // Dominios permitidos
    origin: [`http://localhost:${PORT}`],
    // Métodos HTTP permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Encabezados permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    // Permitir cookies o credenciales
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.use('/auth', usuariosRutas);

app.use('/api/products', productosRutas);

app.use((req,res,next)=>{
    res.status(404);
    res.send('NO EXISTE URL');
});

app.listen(PORT, ()=>{
    console.log('Tomo ativooo!!!')
    console.log(`Servidor en http://localhost:${PORT}`);
});

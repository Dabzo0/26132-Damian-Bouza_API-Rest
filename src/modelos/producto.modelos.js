import fs from 'fs/promises';
import path from 'path';
import {app} from '../data/firestore.js';

const rutaArchivoProductos = path.join(process.cwd(),'src','data','productos.datos.json')

const leerArchivoProductos = async () =>{
    try{
        const data = await fs.readFile(rutaArchivoProductos, 'utf-8');
        return JSON.parse(data)
    }
    catch(error){
        console.error('Error al intentar leer el archivo "poductos.datos.json".',error);
        return [];
    }

};

export const productosJSON = async ()=>{
    return await leerArchivoProductos();
};
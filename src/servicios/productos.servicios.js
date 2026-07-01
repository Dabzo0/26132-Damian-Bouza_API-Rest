import { obtenerTodosLosRegistros, obtenerRegistroPorId, crearRegistro, actualizarRegistro, eliminarRegistroPorId, rearmarRegistro, filtrarRegistros } from '../modelos/firebase.modelos.js';

const colNom = 'productos';

export const listarProductos = async () => {
    return await obtenerTodosLosRegistros(colNom);
};

export const buscarProductoPorId = async (id) => {
    return await obtenerRegistroPorId(colNom, id);
};


export const agregarProducto = async (datosProducto) => {
    return await crearRegistro(colNom, datosProducto);
};


export const modificarProducto = async (id, datosNuevos) => {
    const existeMod = await obtenerRegistroPorId(colNom, id);
    if (!existeMod) { throw new Error('Producto no encontrado');}
    await actualizarRegistro(colNom, id, datosNuevos);
    return {id, ...existeMod, ...datosNuevos};
}; 


export const borrarProducto = async (id) => {
    const existeBorr = await obtenerRegistroPorId(colNom, id);
    if (!existeBorr) { throw new Error('Producto no encontrado');}
    return await eliminarRegistroPorId(colNom, id);
};


export const restaurarProducto = async (id, datosNuevos) => {
    const existeRest = await obtenerRegistroPorId(colNom, id);
    if (!existeRest) { throw new Error('Producto no encontrado');}
    return await rearmarRegistro(colNom, id, datosNuevos);
};


export const buscarProductosPorFiltro = async (dbFiltros=[]) => {
    return await filtrarRegistros(colNom, dbFiltros);
};
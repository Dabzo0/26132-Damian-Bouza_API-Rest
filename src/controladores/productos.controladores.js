import { listarProductos, buscarProductoPorId, agregarProducto, modificarProducto, borrarProducto, restaurarProducto, buscarProductosPorFiltro } from '../servicios/productos.servicios.js';
import { validarId, contieneCamposPermitidos, parsearFiltros }from '../helpers/productos.validaciones.js'

export const getProductos = async (req, res) => {
    try {
        if(Object.keys(req.query).length > 0){
            const filtrosLimpios = parsearFiltros(req.query);
            const productosFiltrados = await buscarProductosPorFiltro(filtrosLimpios);
            return res.status(200).json(productosFiltrados);
        }

        const todosLosProductos = await listarProductos();
        return res.status(200).json(todosLosProductos);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno al obtener los productos.', detalle: error.message });
    }
};

export const getProductoPorId = async (req, res) => {
    try {
        const idGet = validarId(req.params.id);
        if (!idGet) {return res.status(400).json({ error: 'El ID proporcionado no es válido. Debe ser un número entero positivo.' });};
        
        const producto = await buscarProductoPorId(idGet);

        if (!producto) { return res.status(404).json({ error: `El producto con ID ${idGet} no existe.` });}

        return res.status(200).json(producto);
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el producto.', detalle: error.message });
    }
};

export const postProducto = async (req, res) => {
    try {
        const datosProducto = contieneCamposPermitidos(req.body);
        if (!datosProducto) { return res.status(400).json({ error: 'Campos no permitidos/invalidos.' });} 
        
        const nuevoProducto = await agregarProducto(datosProducto);
        return res.status(201).json(nuevoProducto); 
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar el producto.', detalle: error.message });
    }
};

export const patchProducto = async (req, res) => {
    try {
        const id = validarId(req.params.id);
        if (!id) { return res.status(400).json({ error: 'El ID proporcionado no es válido. Debe ser un número entero positivo.' });}

        const datosNuevos = contieneCamposPermitidos(req.body);
        if (!datosNuevos) { return res.status(400).json({ error: 'Campos no permitidos/invalidos.' });}

        const resultado = await modificarProducto(id, datosNuevos);
        return res.status(200).json(resultado);

    } catch (error) {
        if (error.message === 'Producto no encontrado') { return res.status(404).json({ error: 'No se pudo modificar. El producto solicitado no existe.' });}
        return res.status(500).json({ error: 'Error al modificar el producto.', detalle: error.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const id  = validarId(req.params.id);
        if (!id) { return res.status(400).json({ error: 'El ID proporcionado no es válido. Debe ser un número entero positivo.' });}    

        const resultado = await borrarProducto(id);
        return res.status(200).json(resultado);

    } catch (error) {
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: 'No se pudo eliminar. El producto solicitado no existe.' });
        }
        return res.status(500).json({ error: 'Error al eliminar el producto.', detalle: error.message });
    }
};

export const putRestaurarProducto = async (req, res) => {
    try {
        const id = validarId(req.params.id);
        if (!id) { return res.status(400).json({ error: 'El ID proporcionado no es válido. Debe ser un número entero positivo.' });}

        const datosNuevos = contieneCamposPermitidos(req.body);
        if (!datosNuevos) { return res.status(400).json({ error: 'Campos no permitidos/invalidos.' });}

        const resultado = await restaurarProducto(id, datosNuevos);
        return res.status(200).json(resultado);

    } catch (error) {
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: 'No se pudo restaurar. El producto solicitado no existe.' });
        }
        return res.status(500).json({ error: 'Error al restaurar el producto.', detalle: error.message });
    }
};

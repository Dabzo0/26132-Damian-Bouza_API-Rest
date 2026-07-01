const CAMPOS_PERMITIDOS = ['nombre', 'precio', 'descripcion', 'categoria', 'stock', 'estado','imagen'];
// Este archico debererría estar en src/midlewares/productos.validaciones.js, pero lo dejo en helpers para no complicar la estructura de carpetas    
export const validarId = (id) => {
    const idParseado = Number(id);
    //if (!Number.isInteger(idParseado) || isNaN(idParseado) || idParseado <= 0) { return false;};
    // return idParseado; <- Firebase no trabaja con id numéricos, por lo que se retorna el id original en string
    return id
};

export const contieneCamposPermitidos = (datos) => {
    if (Object.keys(datos).length === 0) return false;
    const objetoLimpio = {};

    for (const [key, valor] of Object.entries(datos)) {
        const clave = key.toLowerCase();
        // Si la clave no está en la lista CAMPOS_PERMITIDOS, se retorna false
        if (!CAMPOS_PERMITIDOS.includes(clave)) return false;
        objetoLimpio[clave] = valor;
    }

    return objetoLimpio;
}

export const parsearFiltros = (query = {}) => {
    const dbFiltros = [];
    for (const [key, valor] of Object.entries(query)) {
        
        if (valor === undefined || valor === '') continue;// Si el valor viene vacío, undefined o nulo, lo ignoramos para que no rompa
        let campo = key;
        let operador = '=='; // Operador por defecto si no hay sufijo
        let valorCasteado = valor;

        // Se captura el operador (Se evalua según los sufijos estándares de query params)
        if (key.endsWith('_gt')) {
            campo = key.replace('_gt', '');
            operador = '>';
        } else if (key.endsWith('_gte')) {
            campo = key.replace('_gte', '');
            operador = '>=';
        } else if (key.endsWith('_lt')) {
            campo = key.replace('_lt', '');
            operador = '<';
        } else if (key.endsWith('_lte')) {
            campo = key.replace('_lte', '');
            operador = '<=';
        } else if (key.endsWith('_ne')) {
            campo = key.replace('_ne', '');
            operador = '!=';
        }

        if (valor !== '' && !isNaN(valor)) {valorCasteado = Number(valor);}// Si el valor es numérico, se lo convierte automáticamente 

        dbFiltros.push({ campo, operador, valor: valorCasteado });
    };
    return dbFiltros;
}
import { iniciarSesion } from "../servicios/usuarios.servicios.js";

export const postLoginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: 'Faltan datos requeridos. "email" y "password" son obligatorios.' });
        
        const resultado = await iniciarSesion(email, password);
        
        return res.status(200).json(resultado);

    } catch (error){
        if (error.message === 'Email inválido' || error.message === 'Contraseña inválida') {
            return res.status(401).json({ error: error.message });
        }

        console.error('Error en el controlador de login:', error);
        return res.status(500).json({ error: 'Error interno en el servidor.' });
    }
};

/* Próximamanet:
export const postCrearUsuario = async (req, res) => {}

export const putActualizarUsuario = async (req, res) => {}

export const deleteEliminarUsuario = async (req, res) => {}

*/
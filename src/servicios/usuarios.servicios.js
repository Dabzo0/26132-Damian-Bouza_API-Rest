import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'; <- Se implementara en el futuro para encriptar la contraseña
import { filtrarRegistros } from '../modelos/firebase.modelos.js';
import { generadorToken } from '../utilidades/token-generator.js';

const colNom = 'usuarios';

export const iniciarSesion = async (email, password) => {
    const filtros = [{ campo: 'email', operador: '==', valor: email }];
    const usuariosEncontrados = await filtrarRegistros(colNom, filtros);
    
    if (!usuariosEncontrados || usuariosEncontrados.length === 0) throw new Error('Email inválido');

    const usuario = usuariosEncontrados[0]; // Tomamos el primer usuario encontrado
    
    // const passwordCorrecto = await bcrypt.compare(password, usuario.passwordHash); <-- Se implementara en el futuro para encriptar la contraseña
    const passwordCorrecto = usuario.password === password; // Comparación directa por ahora, pero no es segura.
    if (!passwordCorrecto) throw new Error('Contraseña inválida');

    const token = generadorToken(usuario); // Generamos el token para el usuario autenticado

    // En proyectos reales no se detalla si lo que lo que esta incorrecto es el email o la contraseña, para no dar pistas a posibles atacantes.
    return { token };
};

/* Próximamente:
export const crearUsuario = async (datosUsuario) => {}
export const actualizarUsuario = async (datosUsuario) => {}
export const eliminarUsuario = async (datosUsuario) => {}
*/
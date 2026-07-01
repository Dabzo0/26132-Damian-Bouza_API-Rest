import { collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from '../data/firestore.js';

// 1. Mostrar todos los registros
export const obtenerTodosLosRegistros = async (colNom) => {    
    const colRef = collection(db, colNom); // Creamos la referencia a la colección
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));        
};

// 2. Obtener por un registro ID
export const obtenerRegistroPorId = async (colNom,id) => {
    const docRef = doc(db, colNom, id);// Creamos la referencia al documento específico usando doc()
    const docSnap = await getDoc(docRef);        
    if (!docSnap.exists()) return null;        
    return { id: docSnap.id, ...docSnap.data() }; 
};

// 3. Crear registro
export const crearRegistro = async (colNom, datosProducto) => {
    const colRef = collection(db, colNom); // Creamos la referencia a la colección
    const docRef = await addDoc(colRef, datosProducto);// addDoc recibe la referencia de la colección y los datos del nuevo documento
    return { id: docRef.id, ...datosProducto };
};


// 4. Actualizar registro
export const actualizarRegistro = async (colNom, id, datosNuevos) => {
    const docRef = doc(db, colNom, id);// Creamos la referencia al documento específico usando doc()
    await updateDoc(docRef, datosNuevos);// updateDoc recibe la referencia del documento a actualizar y los nuevos datos
    return { id, ...datosNuevos };
};

// 5. Eliminar registro (Borrado físico)
export const eliminarRegistroPorId = async (colNom, id) => {
    const docRef = doc(db, colNom, id);// Creamos la referencia al documento específico usando doc()
    await deleteDoc(docRef);// deleteDoc recibe la referencia del documento a eliminar
    return {id};
};

// 6. Rearmar un registro o crear uno nuevo si no existe
export const rearmarRegistro = async (colNom, id, datosNuevos) => {
    const docRef = doc(db, colNom, id);// Creamos la referencia al documento específico usando doc()
    await setDoc(docRef, datosNuevos);// setDoc recibe la referencia del documento a establecer y los nuevos datos
    return { id, ...datosNuevos };
};

// 7. Filtrar registros según condiciones --- Se puede combinar con obtenerTodosLosRegistros para obtener todos los registros si no se pasan filtros
export const filtrarRegistros = async (colNom, qFiltros = []) => {
    const colRef = collection(db, colNom);
        
    // 1. Transformamos qFiltros en condiciones reales de Firestore
    const qWhere = qFiltros.map(f => where(f.campo, f.operador, f.valor));
        
    const q = query(colRef, ...qWhere);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id,...doc.data()}));   
};
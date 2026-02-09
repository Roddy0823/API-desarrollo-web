/**
 * ============================================================================
 * CONFIGURACIÓN DE BASE DE DATOS (ALMACENAMIENTO EN MEMORIA)
 * ============================================================================
 * 
 * Este módulo implementa un almacenamiento en memoria para los usuarios.
 * Para un entorno de producción, se debería usar una base de datos real
 * como SQLite, PostgreSQL o MongoDB.
 * 
 * Esta implementación es ideal para demostración y pruebas del servicio.
 * ============================================================================
 */

// ============================================================================
// ALMACENAMIENTO EN MEMORIA
// ============================================================================

/**
 * Array que simula una tabla de usuarios en memoria
 * Cada usuario tiene: id, username, password, createdAt
 * 
 * NOTA: Los datos se pierden al reiniciar el servidor.
 * Esto es intencional para el propósito de esta evidencia.
 */
const users = [];

/**
 * Contador para generar IDs únicos para los usuarios
 */
let nextId = 1;

// ============================================================================
// FUNCIONES DE ACCESO A DATOS
// ============================================================================

/**
 * Función: createUser
 * 
 * Crea un nuevo usuario y lo almacena en el array de usuarios
 * 
 * @param {string} username - Nombre de usuario
 * @param {string} hashedPassword - Contraseña hasheada con bcrypt
 * @returns {Object} El usuario creado con su ID asignado
 */
const createUser = (username, hashedPassword) => {
    const newUser = {
        id: nextId++,
        username: username,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log(`[DB] Usuario creado con ID: ${newUser.id}`);

    return newUser;
};

/**
 * Función: findByUsername
 * 
 * Busca un usuario por su nombre de usuario
 * 
 * @param {string} username - Nombre de usuario a buscar
 * @returns {Object|undefined} Usuario encontrado o undefined
 */
const findByUsername = (username) => {
    return users.find(user => user.username === username);
};

/**
 * Función: getAllUsers
 * 
 * Retorna todos los usuarios (útil para debugging)
 * 
 * @returns {Array} Lista de todos los usuarios
 */
const getAllUsers = () => {
    return users.map(user => ({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
        // No incluimos password por seguridad
    }));
};

// ============================================================================
// EXPORTACIÓN
// ============================================================================

console.log('[DB] Almacenamiento en memoria inicializado');

module.exports = {
    createUser,
    findByUsername,
    getAllUsers
};

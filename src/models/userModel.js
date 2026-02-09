/**
 * ============================================================================
 * MODELO DE USUARIO
 * ============================================================================
 * 
 * Este módulo contiene las operaciones relacionadas con los usuarios.
 * Actúa como capa de abstracción entre el controlador y el almacenamiento.
 * 
 * Funciones:
 * - createUser: Crea un nuevo usuario
 * - findByUsername: Busca un usuario por nombre de usuario
 * ============================================================================
 */

// ============================================================================
// IMPORTACIÓN DE DEPENDENCIAS
// ============================================================================

// Importamos el módulo de base de datos (almacenamiento en memoria)
const db = require('../database/db');

// ============================================================================
// OPERACIONES DE USUARIO
// ============================================================================

/**
 * Función: createUser
 * 
 * Descripción: Crea un nuevo usuario en el sistema
 * 
 * @param {string} username - Nombre de usuario único
 * @param {string} hashedPassword - Contraseña ya hasheada con bcrypt
 * @returns {Object} El usuario creado
 */
const createUser = (username, hashedPassword) => {
    return db.createUser(username, hashedPassword);
};

/**
 * Función: findByUsername
 * 
 * Descripción: Busca un usuario por su nombre de usuario
 * 
 * @param {string} username - Nombre de usuario a buscar
 * @returns {Object|undefined} Usuario encontrado o undefined
 */
const findByUsername = (username) => {
    return db.findByUsername(username);
};

// ============================================================================
// EXPORTACIÓN DE FUNCIONES
// ============================================================================

module.exports = {
    createUser,
    findByUsername
};

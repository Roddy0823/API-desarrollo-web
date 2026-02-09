/**
 * ============================================================================
 * RUTAS DE AUTENTICACIÓN
 * ============================================================================
 * 
 * Este módulo define las rutas (endpoints) disponibles para la autenticación
 * de usuarios. Utiliza Express Router para organizar las rutas de forma modular.
 * 
 * Rutas disponibles:
 * - POST /register: Registrar un nuevo usuario
 * - POST /login: Iniciar sesión con usuario existente
 * ============================================================================
 */

// ============================================================================
// IMPORTACIÓN DE DEPENDENCIAS
// ============================================================================

// Express Router permite crear rutas modulares y separadas del archivo principal
const express = require('express');
const router = express.Router();

// Importamos el controlador que contiene la lógica de autenticación
const authController = require('../controllers/authController');

// ============================================================================
// DEFINICIÓN DE RUTAS
// ============================================================================

/**
 * RUTA: POST /register
 * 
 * Descripción: Registra un nuevo usuario en el sistema
 * 
 * Body esperado (JSON):
 * {
 *   "username": "nombre_usuario",
 *   "password": "contraseña_segura"
 * }
 * 
 * Respuestas posibles:
 * - 201 Created: Usuario registrado exitosamente
 * - 400 Bad Request: Datos faltantes o usuario ya existe
 * - 500 Internal Server Error: Error del servidor
 */
router.post('/register', authController.register);

/**
 * RUTA: POST /login
 * 
 * Descripción: Autentica un usuario existente
 * 
 * Body esperado (JSON):
 * {
 *   "username": "nombre_usuario",
 *   "password": "contraseña"
 * }
 * 
 * Respuestas posibles:
 * - 200 OK: Autenticación satisfactoria
 * - 400 Bad Request: Datos faltantes
 * - 401 Unauthorized: Error en la autenticación (credenciales incorrectas)
 * - 500 Internal Server Error: Error del servidor
 */
router.post('/login', authController.login);

// ============================================================================
// EXPORTACIÓN DEL ROUTER
// ============================================================================

// Exportamos el router para que pueda ser usado en el servidor principal
module.exports = router;

/**
 * ============================================================================
 * CONTROLADOR DE AUTENTICACIÓN
 * ============================================================================
 * 
 * Este módulo contiene la lógica de negocio para el registro e inicio de
 * sesión de usuarios. El controlador actúa como intermediario entre las
 * rutas HTTP y el modelo de datos.
 * 
 * Funciones:
 * - register: Maneja el registro de nuevos usuarios
 * - login: Maneja el inicio de sesión de usuarios existentes
 * ============================================================================
 */

// ============================================================================
// IMPORTACIÓN DE DEPENDENCIAS
// ============================================================================

// bcryptjs: Librería para hashear contraseñas de forma segura
// El hash protege las contraseñas en caso de que la base de datos sea comprometida
const bcrypt = require('bcryptjs');

// Importamos el modelo de usuario para interactuar con la base de datos
const userModel = require('../models/userModel');

// ============================================================================
// CONTROLADOR DE REGISTRO
// ============================================================================

/**
 * Función: register
 * 
 * Descripción: Maneja el registro de un nuevo usuario en el sistema.
 * 
 * Proceso:
 * 1. Extrae username y password del cuerpo de la petición
 * 2. Valida que ambos campos estén presentes
 * 3. Verifica que el usuario no exista previamente
 * 4. Hashea la contraseña para almacenarla de forma segura
 * 5. Guarda el usuario en la base de datos
 * 6. Retorna mensaje de éxito o error según corresponda
 * 
 * @param {Object} req - Objeto de petición HTTP (contiene body con username y password)
 * @param {Object} res - Objeto de respuesta HTTP
 */
const register = async (req, res) => {
    try {
        // Paso 1: Extraemos los datos del cuerpo de la petición usando desestructuración
        const { username, password } = req.body;

        // Paso 2: Validamos que se hayan proporcionado ambos campos
        if (!username || !password) {
            // Si falta algún campo, retornamos error 400 (Bad Request)
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            });
        }

        // Paso 3: Verificamos si el usuario ya existe en la base de datos
        const existingUser = userModel.findByUsername(username);
        if (existingUser) {
            // Si el usuario existe, retornamos error 400
            return res.status(400).json({
                success: false,
                message: 'El usuario ya existe'
            });
        }

        // Paso 4: Hasheamos la contraseña antes de guardarla
        // El número 10 representa el "salt rounds" - mayor número = más seguro pero más lento
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Paso 5: Guardamos el nuevo usuario en la base de datos
        userModel.createUser(username, hashedPassword);

        // Paso 6: Retornamos respuesta exitosa (201 Created)
        console.log(`[REGISTRO] Usuario "${username}" registrado exitosamente`);
        return res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente'
        });

    } catch (error) {
        // En caso de error, lo registramos y retornamos error 500
        console.error('[ERROR] Error en el registro:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// ============================================================================
// CONTROLADOR DE LOGIN
// ============================================================================

/**
 * Función: login
 * 
 * Descripción: Maneja el inicio de sesión de un usuario existente.
 * 
 * Proceso:
 * 1. Extrae username y password del cuerpo de la petición
 * 2. Valida que ambos campos estén presentes
 * 3. Busca el usuario en la base de datos
 * 4. Si el usuario no existe, retorna error de autenticación
 * 5. Compara la contraseña proporcionada con el hash almacenado
 * 6. Retorna éxito si coincide, error si no coincide
 * 
 * @param {Object} req - Objeto de petición HTTP (contiene body con username y password)
 * @param {Object} res - Objeto de respuesta HTTP
 */
const login = async (req, res) => {
    try {
        // Paso 1: Extraemos los datos del cuerpo de la petición
        const { username, password } = req.body;

        // Paso 2: Validamos que se hayan proporcionado ambos campos
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            });
        }

        // Paso 3: Buscamos el usuario en la base de datos
        const user = userModel.findByUsername(username);

        // Paso 4: Si el usuario no existe, retornamos error de autenticación
        // NOTA: Por seguridad, usamos el mismo mensaje para usuario no encontrado
        // y contraseña incorrecta, para no revelar si un usuario existe o no
        if (!user) {
            console.log(`[LOGIN] Intento fallido - Usuario "${username}" no encontrado`);
            return res.status(401).json({
                success: false,
                message: 'Error en la autenticación'
            });
        }

        // Paso 5: Comparamos la contraseña proporcionada con el hash almacenado
        // bcrypt.compare maneja automáticamente la extracción del salt del hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Paso 6: Verificamos el resultado de la comparación
        if (!isPasswordValid) {
            // Contraseña incorrecta - retornamos error 401 (Unauthorized)
            console.log(`[LOGIN] Intento fallido - Contraseña incorrecta para "${username}"`);
            return res.status(401).json({
                success: false,
                message: 'Error en la autenticación'
            });
        }

        // Autenticación exitosa - retornamos mensaje de éxito
        console.log(`[LOGIN] Usuario "${username}" autenticado exitosamente`);
        return res.status(200).json({
            success: true,
            message: 'Autenticación satisfactoria'
        });

    } catch (error) {
        // En caso de error, lo registramos y retornamos error 500
        console.error('[ERROR] Error en el login:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// ============================================================================
// EXPORTACIÓN DE FUNCIONES
// ============================================================================

// Exportamos las funciones del controlador para que puedan ser usadas en las rutas
module.exports = {
    register,
    login
};

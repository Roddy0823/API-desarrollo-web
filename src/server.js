/**
 * ============================================================================
 * SERVICIO WEB DE AUTENTICACIÓN
 * ============================================================================
 * 
 * Evidencia de desempeño: GA7-220501096-AA5-EV01
 * Diseño y desarrollo de servicios web - SENA
 * 
 * Este archivo contiene el servidor principal Express que maneja las 
 * peticiones HTTP para el registro e inicio de sesión de usuarios.
 * 
 * Autor: Estudiante SENA
 * Fecha: Febrero 2026
 * ============================================================================
 */

// ============================================================================
// IMPORTACIÓN DE DEPENDENCIAS
// ============================================================================

// Express: Framework web para Node.js que facilita la creación de APIs REST
const express = require('express');

// Importamos las rutas de autenticación definidas en otro módulo
const authRoutes = require('./routes/auth');

// ============================================================================
// CONFIGURACIÓN DEL SERVIDOR
// ============================================================================

// Creamos una instancia de la aplicación Express
const app = express();

// Definimos el puerto donde escuchará el servidor
// Se puede configurar mediante variable de entorno o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// ============================================================================
// CONFIGURACIÓN DE MIDDLEWARES
// ============================================================================

/**
 * Middleware para parsear JSON
 * Este middleware permite que Express pueda leer el cuerpo (body) de las
 * peticiones que vengan en formato JSON, lo cual es necesario para recibir
 * el usuario y contraseña en el registro y login
 */
app.use(express.json());

/**
 * Middleware para parsear datos de formularios URL-encoded
 * Permite recibir datos enviados desde formularios HTML tradicionales
 */
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// CONFIGURACIÓN DE RUTAS
// ============================================================================

/**
 * Ruta raíz de la API
 * Proporciona información básica sobre el servicio web
 */
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido al Servicio Web de Autenticación',
        descripcion: 'API REST para registro e inicio de sesión de usuarios',
        evidencia: 'GA7-220501096-AA5-EV01 - SENA',
        endpoints: {
            registro: 'POST /api/auth/register',
            login: 'POST /api/auth/login'
        }
    });
});

/**
 * Montamos las rutas de autenticación bajo el prefijo /api/auth
 * Esto significa que:
 * - POST /api/auth/register -> Registro de usuarios
 * - POST /api/auth/login -> Inicio de sesión
 */
app.use('/api/auth', authRoutes);

// ============================================================================
// MANEJO DE ERRORES
// ============================================================================

/**
 * Middleware para manejar rutas no encontradas (404)
 * Se ejecuta cuando ninguna ruta coincide con la petición
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

/**
 * Middleware para manejo de errores generales
 * Captura cualquier error que ocurra durante el procesamiento
 */
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

// ============================================================================
// INICIO DEL SERVIDOR
// ============================================================================

/**
 * Iniciamos el servidor en el puerto configurado
 * El servidor escuchará peticiones HTTP entrantes
 */
app.listen(PORT, () => {
    console.log('============================================');
    console.log('  SERVICIO WEB DE AUTENTICACIÓN - SENA');
    console.log('============================================');
    console.log(`  Servidor corriendo en: http://localhost:${PORT}`);
    console.log('  Endpoints disponibles:');
    console.log(`    - POST http://localhost:${PORT}/api/auth/register`);
    console.log(`    - POST http://localhost:${PORT}/api/auth/login`);
    console.log('============================================');
});

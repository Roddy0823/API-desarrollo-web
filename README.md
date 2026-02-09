# Servicio Web de Autenticación

## 📋 Evidencia de Desempeño
**GA7-220501096-AA5-EV01** - Diseño y desarrollo de servicios web  
**SENA** - Construcción de API

## 📝 Descripción

Servicio web REST para registro e inicio de sesión de usuarios. La API recibe un usuario y una contraseña, valida las credenciales y retorna un mensaje indicando si la autenticación fue exitosa o fallida.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para crear la API REST
- **bcryptjs** - Librería para hashear contraseñas de forma segura
- **better-sqlite3** - Base de datos SQLite para persistencia de usuarios

## 📁 Estructura del Proyecto

```
auth-service-sena/
├── src/
│   ├── server.js              # Servidor principal Express
│   ├── routes/
│   │   └── auth.js            # Definición de rutas de autenticación
│   ├── controllers/
│   │   └── authController.js  # Lógica de negocio (registro/login)
│   ├── models/
│   │   └── userModel.js       # Operaciones de base de datos
│   └── database/
│       └── db.js              # Configuración de SQLite
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd auth-service-sena
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📡 Endpoints de la API

### Información del Servicio
```
GET /
```
Retorna información sobre el servicio y los endpoints disponibles.

---

### Registro de Usuario
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "nombre_usuario",
  "password": "contraseña_segura"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
```

**Respuesta error (400):**
```json
{
  "success": false,
  "message": "El usuario ya existe"
}
```

---

### Inicio de Sesión
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "nombre_usuario",
  "password": "contraseña"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Autenticación satisfactoria"
}
```

**Respuesta error (401):**
```json
{
  "success": false,
  "message": "Error en la autenticación"
}
```

## 🧪 Pruebas con cURL

### Registrar un usuario:
```powershell
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"usuario1\",\"password\":\"micontraseña123\"}"
```

### Iniciar sesión (credenciales correctas):
```powershell
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"usuario1\",\"password\":\"micontraseña123\"}"
```

### Iniciar sesión (credenciales incorrectas):
```powershell
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"usuario1\",\"password\":\"contraseñaerronea\"}"
```

## 🔒 Características de Seguridad

- **Hashing de contraseñas:** Las contraseñas se almacenan hasheadas usando bcrypt con salt de 10 rondas
- **Prevención de SQL Injection:** Se utilizan consultas parametrizadas
- **Mensajes de error genéricos:** No se revela si un usuario existe en mensajes de error de login

## 👤 Autor

Roddy Sebastian Holguin Carvajal / ADSO 3070377

## 📄 Licencia

Este proyecto es para fines educativos - Evidencia de desempeño SENA

# Sistema de Gestión para Ferretería

Este proyecto es un sistema de gestión para una empresa de ferretería que incluye los siguientes módulos:
- Clientes
- Proveedores
- Precios
- Facturas
- Stock
- Estadísticas

## Tecnologías Utilizadas

- **Frontend**: Next.js
- **Backend**: Node.js con Express
- **ORM**: Sequelize
- **Base de Datos**: PostgreSQL
- **Autenticación**: JSON Web Tokens (JWT)
- **Otras Librerías**: Morgan, CORS, bcrypt, Jest

## Requisitos Previos

- Node.js (v14+)
- PostgreSQL

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```env
   PORT=3000
   DB_INTERFACE=postgres
   DB_HOST=localhost
   DB_NAME=nombre_de_tu_base_de_datos
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   JWT_SECRET=tu_secreto_jwt
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

## Scripts

- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.
- `npm start`: Inicia el servidor en modo producción.
- `npm test`: Ejecuta los tests con Jest.

## Estructura del Proyecto

```plaintext
/src
├── /config        # Archivos de configuración
├── /controllers   # Controladores de la aplicación
├── /middlewares   # Middlewares
├── /models        # Modelos de Sequelize
├── /routes        # Definición de rutas
├── /services      # Servicios con la lógica de negocio
└── server.js      # Configuración del servidor
```

## Recomendaciones para el Backend

1. **Estructura del Proyecto**
   - **Configura una estructura de directorios clara**:
     ```plaintext
     /src
     ├── /config
     │   └── database.js
     │   └── config.js
     ├── /controllers
     ├── /middlewares
     ├── /models
     ├── /routes
     ├── /services
     └── server.js
     ```
   
2. **Modelos (Sequelize)**
   - Define modelos para `Client`, `Provider`, `Price`, `Invoice`, `Stock`, y `Statistics` en la carpeta `/models`. Cada modelo debe reflejar las tablas en tu base de datos y las relaciones entre ellas.

3. **Controladores**
   - Crea controladores en `/controllers` que manejen la lógica de negocio para cada entidad. Asegúrate de manejar adecuadamente las operaciones CRUD y cualquier lógica específica de cada módulo.

4. **Servicios**
   - Implementa la lógica de negocio en los servicios en `/services`. Los controladores deben ser lo más delgados posible, delegando la lógica de negocio a los servicios.

5. **Rutas**
   - Configura las rutas en `/routes` para cada módulo (clientes, proveedores, precios, facturas, stock, estadísticas). Asegúrate de usar middlewares para manejar la autenticación y autorización.

6. **Middlewares**
   - Implementa middlewares en `/middlewares` para la autenticación (usando JWT), validación de datos, manejo de errores, etc.

7. **Configuración**
   - Usa variables de entorno para configurar tu base de datos y otras configuraciones sensibles en `/config`.

8. **Manejo de Errores**
   - Implementa un manejo centralizado de errores para capturar y responder adecuadamente a los errores en tu aplicación.

## Ejemplo de Configuración de Modelos

### Modelo de Cliente

```javascript
// models/Client.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Client', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // Otros campos necesarios...
  });
};
```

### Controlador de Cliente

```javascript
// controllers/clientController.js

const { models: { Client } } = require('../config/database');
const { ClientError } = require('../utils/errors');

module.exports = {
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.findAll();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  },
  // Otros métodos (crear, actualizar, eliminar)...
};
```

### Ruta de Cliente

```javascript
// routes/clientRoutes.js

const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.get('/', clientController.getAllClients);
// Otras rutas (POST, PUT, DELETE)...

module.exports = router;
```

### Servidor

```javascript
// server.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const errorHandler = require('./middlewares/errorHandler'); // Importa el middleware de manejo de errores

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/clients', clientRoutes);

server.use('*', (req, res) => {
  res.status(404).json({
    error: true,
    message: 'Endpoint no encontrado',
  });
});

// Usa el middleware de manejo de errores
server.use(errorHandler);

module.exports = server;
```

### Middleware de Manejo de Errores

```javascript
// middlewares/errorHandler.js

const { ClientError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  }

  res.status(500).json({
    error: true,
    message: 'Ocurrió un problema inesperado, intentelo nuevamente.',
  });

  console.error('Error:', err.message);
};

module.exports = errorHandler;
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, envía un pull request para revisión.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

// middleware/errorHandler.js

const { ClientError } = require('../utils/errors');

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // Si las cabeceras ya se han enviado, pasa al siguiente middleware
    return next(err);
  }

  if (err instanceof ClientError) {
    // Si el error es una instancia de ClientError, envía una respuesta con el mensaje de error y el código de estado adecuado
    console.error('Client Error Messagge:', err.message);
    return res.status(err.statusCode).json({
      error: true,
      message: err.message
    });
  }

  // Si el error no es una instancia de ClientError, envía una respuesta genérica con un código de estado 500
  res.status(500).json({
    error: true,
    message: 'Ocurrió un problema inesperado, intentelo nuevamente.'
  });

  // También puedes imprimir el error en la consola para propósitos de registro
  console.error('Error:', err.message);
};

module.exports = errorHandler;

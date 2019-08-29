const winston = require('winston');

module.exports = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: process.env.SERVICE_NAME || 'purchases_services' },
  silent: process.env.LOGGER_ENABLED || false,
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  ],
});

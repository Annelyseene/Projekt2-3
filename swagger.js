// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laptop Repair Service API',
      version: '1.0.0',
      description: 'Документация для REST API системы ремонта техники',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // искать JSDoc в файлах с маршрутами
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

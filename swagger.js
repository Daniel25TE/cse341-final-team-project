const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'LIMS API - Library Inventory Management System',
        description: 'API for book inventory management across four collections: Romance, Mystery, Fantasy, and Autobiography. Allows full CRUD for Admins and read-only access for Users.'
    },
    
    host: 'localhost:3004', 
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

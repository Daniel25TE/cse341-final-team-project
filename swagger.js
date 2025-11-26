const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; 

const endpointsFiles = ['./routes/index.js']; 

const doc = {
    info: {
        title: 'LIMS API - Library Inventory Management System',
        description: 'API for book inventory management across four collections: Romance, Mystery, Fantasy, and Autobiography. Allows full CRUD for Admins and read-only access for Users (JWT based).'
    },
    host: 'localhost:3004', 
    schemes: ['http', 'https'],
    
    securityDefinitions: { 
        apiKey: {
            type: 'apiKey',
            name: 'Authorization', // Header name
            in: 'header',
            description: 'JWT Token for access. Format: **Bearer <token>**'
        }
    },
    
    definitions: {
        Book: {
            title: 'Title of the Book',
            author: 'Author Name',
            publishDate: '2023-01-01',
            publisher: 'Publisher Name',
            price: 15.99,
            bio: 'A brief synopsis of the book.',
            status: true 
        }
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
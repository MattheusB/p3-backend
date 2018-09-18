const swagger = require('swagger-jsdoc');

const swaggerDef = {
    'basePath': '/',
    'host': 'localhost:3000',
    'info': {
        'description': 'Um tinder para donos de cachorros',
        'title': 'TinDog',
        'version': '1.2.7'
    }
};

const options = {
    'apis': ['../**/*.swagger.js'],
    'swaggerDefinition': swaggerDef
};

const swaggerSpec = swagger(options);

module.exports = swaggerSpec;
const swagger = require('swagger-jsdoc');

const swaggerDef = {
    'basePath': '/',
    'host': 'localhost:3000',
    'info': {
        'description': 'Um tinder bom pra cachorro',
        'title': 'TinDog',
        'version': '1.0.0'
    },
    'paths': {
        '/user': {
            'get': {
                'summary': 'All users in system',
                'tags': {'': 'user'},
                'description': 'Returns a list of all users on system',
                'responses': {
                    '200': {
                        'description': 'A JSON array of all users',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'application/json'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const options = {
    'apis': ['../routes/**/*.js'],
    'swaggerDefinition': swaggerDef
};

const swaggerSpec = swagger(options);

module.exports = swaggerSpec;
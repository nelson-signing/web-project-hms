const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Management API',
            version: '1.0.0',
            description: 'Backend API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                RegisterClient: {
                    type: 'object',
                    properties: {
                        first_name: { type: 'string', example: 'Jean' },
                        last_name: { type: 'string', example: 'Dupont' },
                        email: { type: 'string', example: 'jean.dupont@email.com' },
                        password: { type: 'string', example: 'MotDePasse123' },
                        phone_number: { type: 'string', example: '0601020304' },
                        address: { type: 'string', example: '123 Rue de la Paix, 75000 Paris' }
                    }
                },
                RegisterStaff: {
                    type: 'object',
                    properties: {
                        registration_key: { type: 'string', example: 'MyHotelSecret123!' },
                        first_name: { type: 'string', example: 'Alice' },
                        last_name: { type: 'string', example: 'Manager' },
                        email: { type: 'string', example: 'staff.alice@hotel.com' },
                        password: { type: 'string', example: 'StaffSecure789' }
                    }
                },
                Login: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', example: 'jean.dupont@email.com' },
                        password: { type: 'string', example: 'MotDePasse123' }
                    }
                },
                UpdateProfile: {
                    type: 'object',
                    properties: {
                        first_name: { type: 'string', example: 'Jean-Marc' },
                        last_name: { type: 'string', example: 'Dupontel' },
                        phone_number: { type: 'string', example: '0701020304' },
                        address: { type: 'string', example: '456 Avenue des Champs-Élysées'}
                    }
                },
                Room: {
                    type: 'object',
                    properties: {
                        number: {type: 'string', example: '101'},
                        type: {type: 'string', example: 'Double'},
                        description: { type: 'string', example: 'Ocean view room'},
                        price_per_night: {type: 'number', example: 85.50},
                        image: {type: 'string', format: 'binary'}
                    }
                },
                BookingClient: {
                    type: 'object',
                    properties: {
                        id_room: { type: 'integer', example: 10 },
                        start_date: { type: 'string', format: 'date', example: '2026-06-01' },
                        end_date: { type: 'string', format: 'date', example: '2026-06-05' }
                    }
                },
                BookingStaff: {
                    type: 'object',
                    properties: {
                        id_room: { type: 'integer', example: 10 },
                        id_user: { type: 'integer', example: 42, description: 'Client ID for whom the staff is booking' },
                        start_date: { type: 'string', format: 'date', example: '2026-06-01' },
                        end_date: { type: 'string', format: 'date', example: '2026-06-05' }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};


const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
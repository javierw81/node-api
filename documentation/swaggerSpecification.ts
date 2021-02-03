import swaggerJsdoc from 'swagger-jsdoc'
import { environment } from '../src/helpers/config';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: `${environment.app.name} - API`,
            version: `${environment.app.version}`,
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Javier Wamba',
                email: 'javierw81@gmail.com'
            },
        },
        servers: [
            {
                url: `${environment.app.baseUrl}api`,
                description: 'Development server',
            },
        ],
        host: `${environment.app.baseUrl}`,
        components: {
            securitySchemes: {
                ApiKeyAuth:
                {
                    type: 'apiKey',
                    in: 'header',
                    name: 'authorization',
                }
            }
        },
        security: [{
            ApiKeyAuth: []
        }]
    },
    apis: ['./src/routers/*Router.ts'],

}


export const createSwaggerSpecification = (): any => {
    return swaggerJsdoc(options)
}





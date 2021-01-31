import swaggerJsdoc from 'swagger-jsdoc'
import fs from 'fs'
import { environment } from '../src/helpers/config';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: `${environment.app.name} - API`,
            version: `${environment.app.version}`,
        },
        servers: [
            {
                url: `${environment.app.baseUrl}api`,
            },
        ],
        host: `${environment.app.baseUrl}`
    },
    apis: ['./src/routers/*Router.ts'],

};

const swaggerSpecification = swaggerJsdoc(options)

fs.writeFile('./api-docs/api.json', JSON.stringify(swaggerSpecification), function (err) {
    if (err) {
        console.error(err)
        throw err
    }
    console.log('Saved!');
})
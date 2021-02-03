import { createSwaggerSpecification } from "../../documentation/SwaggerSpecification";

describe('API Documentation - create', () => {
    test('YAML to Json', () => {
        const result = createSwaggerSpecification()
        expect(result).toBeDefined();
    })
})
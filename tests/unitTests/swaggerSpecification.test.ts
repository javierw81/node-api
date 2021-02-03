import { createSwaggerSpecification } from "../../documentation/swaggerSpecification";

describe('API Documentation - create', () => {
    test('YAML to Json', () => {
        const result = createSwaggerSpecification()
        expect(result).toBeDefined();
    })
})
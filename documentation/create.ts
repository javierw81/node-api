import fs from 'fs'
import { createSwaggerSpecification } from './swaggerSpecification'

let specification
try {
    let hasError = false
    const originalLogError = console.error
    console.error = function () {
        hasError = true
        return originalLogError('\x1b[31m', ...arguments);
    }
    specification = createSwaggerSpecification()
    console.error = originalLogError
    if (hasError) {
        throw new Error(`don't saved!`)
    }
    fs.mkdirSync('./api-docs', { recursive: true })
    fs.writeFileSync('./api-docs/api.json', JSON.stringify(specification))
    console.log('\x1b[32m', 'saved!')

} catch (error) {
    console.error('\x1b[31m', error)
} finally {
    console.log('\x1b[0m')
}

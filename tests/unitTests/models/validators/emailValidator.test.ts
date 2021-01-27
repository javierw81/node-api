import { emailValidator } from '../../../../src/models/validators/emailValidator'

describe('Validator - emailValidator', () => {
    test('emailValidator was success', () => {
        const result = emailValidator.validator("test@test.com")
        expect(result).toBeTruthy()
    })

    test('emailValidator was fail', () => {
        const result = emailValidator.validator("testtest.com")
        expect(result).toBeFalsy()
    })
})
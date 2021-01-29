import { emailValidator } from '../../../../src/models/validators/emailValidator'

describe('Models - Validators', () => {
    test('emailValidator was success', () => {
        const result = emailValidator.validator("test@test.com")
        expect(result).toBeTruthy()
    })

    test('emailValidator was fail', () => {
        const result = emailValidator.validator("testtest.com")
        expect(result).toBeFalsy()
    })
})
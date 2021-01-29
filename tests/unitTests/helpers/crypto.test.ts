import { environment } from '../../../src/helpers/config';
import { guid, generateSalt, hash, verifyHash } from '../../../src/helpers/crypto'

describe('Helpers - Crypto', () => {
    test('Guid was success', () => {
        const result = guid()
        expect(result.length).toBe(36);
    })

    test('Salt random was success', () => {
        const result = generateSalt()
        expect(result.length).toBeGreaterThan(0);
    })

    test('hash  was success', () => {
        const result = hash("passwordSecret", generateSalt())
        expect(result.length).toBeGreaterThan(0);
    })

    test('verifyHash  was success', () => {
        const testToHash = "chimoltrufia"
        const salt = generateSalt()

        const hashResult = hash(testToHash, salt)
        const result = verifyHash(testToHash, hashResult, salt)

        expect(result).toBeTruthy();
    })

    test('hash from env was success', () => {
        const result = hash("passwordSecret", environment.crypto.passwordSaltHash)
        expect(result.length).toBeGreaterThan(0);
    })

    test('verifyHash from env was success', () => {
        const testToHash = "passwordSecret"
        const salt = environment.crypto.passwordSaltHash

        const hashResult = hash(testToHash, salt)
        const result = verifyHash(testToHash, hashResult, salt)

        expect(result).toBeTruthy();
    })

    test('verifyHash  was fail', () => {
        const testToHash = "passwordSecret"
        const salt = generateSalt()

        const hashResult = hash(testToHash, salt)
        const result = verifyHash("passwordSecretWrong", hashResult, salt)

        expect(result).toBeFalsy();
    })

})
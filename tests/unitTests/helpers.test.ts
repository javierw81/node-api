import { guid } from '../../src/helpers/common'

describe('Helpers', () => {
    it('Guid generated is success', () => {
        const result = guid()
        expect(result.length).toBe(36);
    });
})
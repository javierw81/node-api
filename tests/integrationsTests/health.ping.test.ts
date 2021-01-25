import supertest from 'supertest'
import { app } from '../../src/app'
import { closeDb, connectDb } from '../../src/providers/databaseProvider'
import { closeKeyValueDb } from '../../src/providers/keyValueDatabaseProvider'
import { PREFIX_URL } from '../supports/constants'

describe('Health - Ping', () => {
    beforeAll(async () => {
        await connectDb()
    })

    afterAll(async () => {
        await closeDb()
        closeKeyValueDb()
    })

    test('Get is success', async () => {

        const response = await supertest(app)
            .get(`${PREFIX_URL}/ping`)
            .then(response => response)
        expect(response.status).toBe(200)
        expect(response.body.statusDb).toBe('connected')
        expect(response.body.statusKeyValueDb).toBe('connected')
        expect(response.body.status).toBe('ok')
        expect(response.body.appName).toBe('NODE-API')
        expect(response.body.appVersion).toBeDefined()
        expect(response.body.appVersion.split('.').length).toBe(3)
        expect(response.body.env).toBe('test')
    })
})
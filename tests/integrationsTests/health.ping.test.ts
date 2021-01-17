import supertest from 'supertest'
import { app } from '../../src/app'
import { closeDb, connectDb } from '../../src/providers/databaseProvider'
import { PREFIX_URL } from '../supports/constants'

describe('Health - Ping', () => {
    beforeEach(async () => {
        await connectDb()
    })

    afterEach(async () => {
        await closeDb()
    })

    it('Get is success', async () => {

        const response = await supertest(app)
            .get(`${PREFIX_URL}/ping`)
            .then(response => response)
        expect(response.status).toBe(200)
        expect(response.body.statusDb).toBe('connected')
        expect(response.body.status).toBe('ok')
        expect(response.body.appName).toBe('NODE-API')
        expect(response.body.env).toBe('test')
    })
})
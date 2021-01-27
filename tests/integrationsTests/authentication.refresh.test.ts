import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL } from '../supports/constants'
import { closeKeyValueDb } from '../../src/providers/keyValueDatabaseProvider'
import { closeDb, connectDb } from '../../src/providers/databaseProvider'
import { dataMocker } from '../supports/dataMocker'
import { UserModel } from '../../src/models/User'
import { defaultUsers } from '../mocks/usersMock'

describe('Authentication - refresh', () => {
    beforeAll(async () => {
        await connectDb()
        await dataMocker.clean(UserModel)
        await dataMocker.addData(UserModel, defaultUsers)
    })

    afterAll(async () => {
        await closeDb()
        closeKeyValueDb()
    })

    test('Post is success', async () => {

        const responseSignIn = await supertest(app)
            .post(`${PREFIX_URL}/signin`)
            .send({
                "username": "chavotest",
                "password": "chimoltrufia"
            })
            .then(response => response)

        const response = await supertest(app)
            .post(`${PREFIX_URL}/refresh`)
            .send({
                "username": "chavotest",
                "refreshToken": responseSignIn.body.refreshToken
            })
            .then(response => response)

        expect(response.status).toBe(200)
        expect(response.body.username).toBe("chavotest")
        expect(response.body.token).toBeDefined()
        expect(response.body.refreshToken).toBeUndefined()

    })

    test('Post is unauthorized', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/refresh`)
            .send({
                "username": "chavotest",
                "refreshToken": "chimoltrufia"
            })
            .then(response => response)

        expect(response.status).toBe(401)
        expect(response.body.token).toBeUndefined()
        expect(response.body.refreshToken).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(401)
        expect(response.body.message).toBe('Invalid token')
    })

    test('Post is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/refresh`)
            .send({
                "username": "",
                "refreshToken": ""
            })
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.token).toBeUndefined()
        expect(response.body.refreshToken).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" is not allowed to be empty')
    })

    test('Post with invalid body object is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/refresh`)
            .send({
                "username": "invalid_username",
                "refreshToken": " "
            })
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.token).toBeUndefined()
        expect(response.body.refreshToken).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" must only contain alpha-numeric characters')
    })
})
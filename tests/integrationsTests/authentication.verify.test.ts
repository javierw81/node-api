import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL } from '../supports/constants'
import { closeKeyValueDb, keyValueClient } from '../../src/providers/keyValueDatabaseProvider'
import { dataMocker } from '../supports/dataMocker'
import { UserModel } from '../../src/models/User'
import { defaultUsers } from '../mocks/usersMock'
import { connectDb, closeDb } from '../../src/providers/databaseProvider'
import sinon from 'sinon'

describe('Authentication - verify', () => {
    beforeAll(async () => {
        await connectDb()
    })

    beforeEach(async () => {
        await dataMocker.clean(UserModel)
        await dataMocker.addData(UserModel, defaultUsers)
    })

    afterAll(async () => {
        await closeDb()
        closeKeyValueDb()
    })

    test("Get is success", async () => {
        const spy = sinon.spy(keyValueClient, 'set')
        const userParams = {
            "username": "chavotest2",
            "password": "chimoltrufia",
            "email": "javierw812@gmail.com",
            "name": "Chavo Test",
            "surname": "Test"
        }

        const responseSignup = await supertest(app)
            .post(`${PREFIX_URL}/signup`)
            .send(userParams)
            .then(response => response)

        expect(responseSignup.status).toBe(200)

        const args = spy.getCall(0).args
        const verifyToken = args[0]
        const username = args[1]

        const response = await supertest(app)
            .get(`${PREFIX_URL}/verify/${username}/${verifyToken}`)
            .then(response => response)

        expect(response.status).toBe(200)

    })

    test('Get is success with specific verifyToken', async () => {
        const verifyToken = '1jk1h321jk3h1j23h12kj'
        const username = 'chavotest'
        keyValueClient.set(verifyToken, username)
        const response = await supertest(app)
            .get(`${PREFIX_URL}/verify/${username}/${verifyToken}`)
            .then(response => response)

        expect(response.status).toBe(200)
    })

    test('Get is notFound', async () => {
        const response = await supertest(app)
            .get(`${PREFIX_URL}/verify`)
            .then(response => response)

        expect(response.status).toBe(404)
    })

    test('Get with invalid body object is badRequest', async () => {
        const response = await supertest(app)
            .get(`${PREFIX_URL}/verify/invalid_username/1jk1h321jk3h1j23h12kj`)
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" must only contain alpha-numeric characters')
    })
})
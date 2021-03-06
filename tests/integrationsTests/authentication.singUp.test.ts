import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL } from '../supports/constants'
import { dataMocker } from '../supports/dataMocker'
import { UserModel } from '../../src/models/User'
import { closeDb, connectDb } from '../../src/providers/databaseProvider'
import { closeKeyValueDb } from '../../src/providers/keyValueDatabaseProvider'
import { environment } from '../../src/helpers/config'
import { hash } from '../../src/helpers/crypto'
import * as emailProvider from '../../src/providers/emailProvider'
import sinon from 'sinon'

describe('Authentication - signUp', () => {
    beforeAll(async () => {
        await connectDb()
        await dataMocker.clean(UserModel)
    })

    afterAll(async () => {
        await closeDb()
        closeKeyValueDb()
    })

    test('Post is success', async () => {
        const sendMailStub = sinon.stub(emailProvider.emailClient, "sendMail").returns(Promise.resolve(true))

        const userParams = {
            "username": "chavotest",
            "password": "chimoltrufia",
            "email": "javierw81@gmail.com",
            "name": "Chavo Test",
            "surname": "Test"
        }

        const response = await supertest(app)
            .post(`${PREFIX_URL}/signup`)
            .send(userParams)
            .then(response => response)

        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
            ...userParams,
            password: hash("chimoltrufia", environment.crypto.passwordSaltHash)
        })
        expect(sendMailStub.calledOnce).toBeTruthy()
        sendMailStub.restore()
    })
    test('Post is badRequest, email incorrect', async () => {
        const userParams = {
            "username": "chavotest",
            "password": "chimoltrufia",
            "email": "javierw81gmail.com",
            "name": "Chavo Test",
            "surname": "Test"
        }

        const response = await supertest(app)
            .post(`${PREFIX_URL}/signup`)
            .send(userParams)
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"email" must be a valid email')
    })

    test('Post is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signup`)
            .send({
                "username": "",
                "password": ""
            })
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" is not allowed to be empty')
    })
})
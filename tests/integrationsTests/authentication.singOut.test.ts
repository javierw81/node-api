import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL, TOKEN_VALID, TOKEN_EXPIRED } from '../supports/constants'
import { closeKeyValueDb } from '../../src/providers/keyValueDatabaseProvider'
import { closeDb, connectDb } from '../../src/providers/databaseProvider'
import { dataMocker } from '../supports/dataMocker'
import { UserModel } from '../../src/models/User'
import { defaultUsers } from '../mocks/usersMock'

describe('Authentication - signOut', () => {
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
            .post(`${PREFIX_URL}/signout`)
            .send({
                "refreshToken": responseSignIn.body.refreshToken
            })
            .set('authorization', responseSignIn.body.token)
            .then(response => response)

        expect(response.status).toBe(200)
    })

    test('Post is unauthorized', async () => {
        const wrongToken = 'wrong_token'
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .send({
                "refreshToken": "wrog_refresh_token"
            })
            .set('authorization', wrongToken)
            .then(response => response)

        expect(response.status).toBe(401)
    })

    test('Post is expired', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .send({
                "refreshToken": "wrog_refresh_token"
            })
            .set('authorization', TOKEN_EXPIRED)
            .then(response => response)

        expect(response.status).toBe(401)
    })


    test('Post without header authorization is unauthorized', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .send({
                "refreshToken": "wrog_refresh_token"
            })
            .then(response => response)

        expect(response.status).toBe(401)
    })

    test('Post is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .send({
                "refreshToken": ""
            })
            .set('authorization', TOKEN_VALID)
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.token).toBeUndefined()
        expect(response.body.refreshToken).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"refreshToken" is not allowed to be empty')
    })
})
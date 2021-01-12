import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL } from '../supports/constants'

describe('Authentication - signIn', () => {
    it('Post is success', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signin`)
            .send({
                "username": "chavotest",
                "password": "chimoltrufia"
            })
            .then(response => response)

        expect(response.status).toBe(200)
        expect(response.body.username).toBe("chavotest")
        expect(response.body.token).toBeDefined()

    })

    it('Post is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signin`)
            .send({
                "username": "",
                "password": ""
            })
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.token).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" is not allowed to be empty')
    })

    it('Post with invalid body object is badRequest', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signin`)
            .send({
                "username": "invalid_username",
                "password": " "
            })
            .then(response => response)

        expect(response.status).toBe(400)
        expect(response.body.token).toBeUndefined()
        expect(response.body.status).toBe('error')
        expect(response.body.statusCode).toBe(400)
        expect(response.body.message).toBe('"username" must only contain alpha-numeric characters')
    })
})
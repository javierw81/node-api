import supertest from 'supertest'
import { app } from '../../src/app'
import { PREFIX_URL, TOKEN_VALID, TOKEN_EXPIRED } from '../supports/constants'

describe('Authentication - signOut', () => {
    it('Post is success', async () => {

        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .set('authorization', TOKEN_VALID)
            .then(response => response)

        expect(response.status).toBe(200)
    })

    it('Post is unauthorized', async () => {
        const wrongToken = 'wrong_token'
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .set('authorization', wrongToken)
            .then(response => response)

        expect(response.status).toBe(401)
    })

    it('Post is expired', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .set('authorization', TOKEN_EXPIRED)
            .then(response => response)

        expect(response.status).toBe(401)
    })


    it('Post without header authorization is unauthorized', async () => {
        const response = await supertest(app)
            .post(`${PREFIX_URL}/signout`)
            .then(response => response)

        expect(response.status).toBe(401)
    })
})